import cron from 'node-cron';
import database from './database';
import stripe from './services/stripe';
import { userSelection } from './components/users/entities';
import { listTransactions } from './services/nordigen/controller';
import { sendPushNotification } from './services/notifications/controllers';

export default async function transactionsCron() {
  cron.schedule('* * * * *', async () => {
    const bankAccounts = await database.bankAccount.findMany({ where: { status: 'ACTIVE' } });
    await Promise.all(bankAccounts.map(async (bankAccount) => {
      console.log('ACCOUNT ID:', bankAccount.accountId);
      // const transactions = await listTransactions(bankAccount.accountId);
      console.log('New Transaction:', 1);
      console.log('Billing Iban:', bankAccount.iban);
      const user = await database.user.findUnique({ where: { id: bankAccount.userId } });
      // create stripe source object
      try {
        const source = await stripe.sources.create({
          type: 'sepa_debit',
          sepa_debit: { iban: 'FR1420041010050500013M02606' },
          currency: 'eur',
          owner: {
            name: 'Jenny Rosen',
            address: {
              city: 'Frankfurt',
              country: 'DE',
              line1: 'Genslerstraße 24',
              postal_code: '15230',
              state: 'Brandenburg',
            },
          },
        });
        // attack the source to the customer
        await stripe.customers.createSource(
          user.stripeCustomerId,
          {
            source: source.id,
          });
        // charge the resource
        console.log(user.roundedTo.toNumber()  * 100)
        const charge = await stripe.charges.create({
          amount: user.roundedTo.toNumber()  * 100,
          currency: 'eur',
          customer: user.stripeCustomerId,
          source: source.id,
        });
        await database.transaction.create({
          data: {
            amount: 1000 - user.roundedTo.toNumber()  * 100,
            roundAmount: user.roundedTo.toNumber()  * 100,
            initialAmount: 1050,
            bankAccount: {
              connect: { id: bankAccount.id }
            },
            user: {
              connect: { id: user.id }
            }
          }
        })
        sendPushNotification(
          user.deviceNotificationToken,
          '50 cents as been added to your wallet'
        );
        const newUser = await database.user.update({
          where: { id: user.id },
          data: {
            piggyBank: {
              increment: 50,
            },
          },
          select: userSelection,
        });
        console.log('User piggy bank:', newUser.piggyBank);
      } catch (err) {
        console.log(err);
      }
    }));
  });
}
