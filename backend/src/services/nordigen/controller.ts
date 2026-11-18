import axios from 'axios';
import config from './config';
import { v4 as uuidv4 } from 'uuid';
import database from '../../database';
import { getUser } from '../../components/users/controllers';

export async function getAccessToken() {
  const response = await axios.post('https://ob.nordigen.com/api/v2/token/new/', {
    'secret_id': config.CLIENT_ID,
    'secret_key': config.CLIENT_SECRET,
  })
  return `Bearer ${response.data.access}`;
}

export async function listAvailableBanks() {
  const accessToken = await getAccessToken();

  const banks = [];
  /*
  const banks = (await axios.get('https://ob.nordigen.com/api/v2/institutions/?country=fr', {
    headers: {
      'Authorization': accessToken,
    }
  })).data;
   */
  banks.push({
    id: 'SANDBOXFINANCE_SFIN0000',
    name: 'SANDBOXFINANCE_SFIN0000'
  });
  return banks;
}

export async function getInstitutionAuthLink(institutionId: string, redirectUrl: string, userId: string) {
  const accessToken = await getAccessToken();

  const agreement = await axios.post('https://ob.nordigen.com/api/v2/agreements/enduser', {
    'institution_id': institutionId,
    'max_historical_days': '90',
    'access_valid_for_days': '30',
    'access_scope': [
      'balances',
      'details',
      'transactions'
    ]
  }, {
    headers: {
      'Authorization': accessToken,
    }
  });

  const requisition = await axios.post('https://ob.nordigen.com/api/v2/requisitions/', {
    'redirect': redirectUrl,
    'institution_id': institutionId,
    'reference': uuidv4(),
    'agreement': agreement.data.id,
    'user_language':'FR'
  }, {
    headers: {
      'Authorization': accessToken,
    }
  });

  await database.user.update({
    where: { id: userId },
    data: {
      nordigenRequisitions: requisition.data.id,
    }
  })

  return requisition.data.link;
}

export async function institutionValidation(ref: string, userId: string) {
  const accessToken = await getAccessToken();
  const user = await getUser({ id: userId });

  const requisitions = (await axios.get('https://ob.nordigen.com/api/v2/requisitions', {
    headers: {
      'Authorization': accessToken,
    }
  })).data.results;

  // @ts-ignore
  const currentReq = requisitions.find(req => req.reference === ref);
  if (!user.nordigenRequisitions.includes(currentReq.id)) {
    throw new Error('using ref on invalid user');
  }
  // @ts-ignore
  await Promise.all(currentReq.accounts.map(async (accountId) => {
    const nordigenAccount = (await axios.get(`https://ob.nordigen.com/api/v2/accounts/${accountId}`, {
      headers: {
        'Authorization': accessToken,
      }
    })).data;
    const transactions = (await axios.get(`https://ob.nordigen.com/api/v2/accounts/${accountId}/transactions`, {
      headers: {
        'Authorization': accessToken,
      }
    })).data;
    return database.bankAccount.create({
      data: {
        iban: nordigenAccount.iban,
        institution: nordigenAccount.institution_id,
        accountId: accountId,
        requisitionId: currentReq.id,
        status: 'DISABLED',
        numberOfTransactions: transactions.transactions.booked.length,
        user: {
          connect: { id: userId }
        }
      }
    })
  }))
  return { message: 'success' };
}

export async function listTransactions(accountId: string) {
  console.log(1);
  const accessToken = await getAccessToken();
  console.log(2);
  const resp = await axios.get(`https://ob.nordigen.com/api/v2/accounts/${accountId}/transactions`, {
    headers: {
      'Authorization': accessToken,
    }
  });
  console.log(resp.data);
  console.log(3);
  return resp.data;
}

export async function disableAccount(accountId: string) {
  return database.bankAccount.update({
    where: { id: accountId },
    data: {
      status: 'DISABLED',
    }
  });
}


export async function activeAccount(accountId: string) {
  return database.bankAccount.update({
    where: { id: accountId },
    data: {
      status: 'ACTIVE',
    }
  });
}

export async function deleteAccount(accountId: string) {
  return database.bankAccount.delete({ where: { id: accountId }});
}
