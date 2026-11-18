import { StatusCodes} from 'http-status-codes';

import database from '../../database';
import stripe from '../../services/stripe';

import { ErrorRo } from '../../error';
import { getUser } from '../users/controllers';
import { userSelection } from '../users/entities';
import { DonateToProjectByCardBody, GetProjects } from './entities';

export async function getProjects(query: GetProjects) {
  let projects = await database.project.findMany({
    include: {
      Actions: true,
      Donations: true,
    }
  });
  if (query.tag) {
    projects = projects.filter((project) => project.tags.includes(query.tag));
  }
  if (query.q) {
    projects = projects.filter((project) => project.name.includes(query.q));
  }
  return projects;
}

export async function getTrendingProjects() {
  const currentDate = new Date();
  const lastWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);

  const projects = await database.project.findMany({
    include: {
      Actions: true,
      Donations: true,
    }
  });
  let weeklyProjects = await database.project.findMany({
    where: {
      createdAt: {
        lte: currentDate,
        gte: lastWeekDate,
      }
    },
    include: {
      Actions: true,
      Donations: true,
    }
  });
  if (weeklyProjects.length === 0) {
    weeklyProjects = await database.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      include: {
        Actions: true,
        Donations: true,
      }
    })
  }
  const projectWithDonation = await Promise.all(projects.map(async (p) => {
    const donations = await database.donation.aggregate({
      where: {
        projectId: p.id,
        createdAt: {
          lte: currentDate,
          gte: lastWeekDate,
        }
      },
      _count: true
    });
    return { ...projects, weeklyDonations: donations._count }
  }));
  const trendingDonations = projectWithDonation.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.weeklyDonations === value.weeklyDonations
      ))
  );
  return { weeklyProjects, trendingDonations };
}

export async function getProject(id: string) {
  const project = await database.project.findUnique({
    where: { id },
    include: {
      Actions: true,
      Donations: true,
      Owner: true,
    }
  });
  if (!project) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'project not found', 'project-not-found');
  }
  return project;
}


export async function projectDonation(userId: string, projectId: string, amount: number) {
  const user = await getUser({ id: userId });

  if (user.piggyBank < amount * 100 || user.piggyBank - (amount * 100) < 0) {
    throw ErrorRo(StatusCodes.BAD_REQUEST, 'not enough in piggy bank', 'too-low-piggy-bank');
  }

  await database.donation.create({
    data: {
      amount: amount * 100,
      type: 'piggy-bank',
      User: {
        connect: { id: userId },
      },
      Project: {
        connect: { id: projectId },
      }
    }
  });

  await database.user.update({
    where: { id: userId },
    data: {
      piggyBank: {
        decrement: amount * 100,
      },
    },
    select: userSelection,
  });

  const project = await database.project.update({
    where: { id: projectId },
    data: {
      raisedCurrently: {
        increment: amount * 100
      },
    },
  });

  return project;
}

export async function projectCardPaymentLink(userId: string, projectId: string, body: DonateToProjectByCardBody) {
  const project = await database.project.findUnique({ where: { id: projectId }});

  if (!project) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'project not found', 'project-not-found');
  }

  const product = await stripe.products.create({
    name: project.name,
  });

  const price = await stripe.prices.create({
    unit_amount: body.amount * 100,
    currency: 'eur',
    product: product.id,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: body.successUrl,
    cancel_url: body.successUrl,
    payment_intent_data: {
      metadata: {
        userId,
        amount: body.amount,
        productId: projectId,
        type: 'project',
      }
    }
  });

  return { url: session.url };
}

export async function projectCardPaymentSheet(userId: string, projectId: string, amount: number) {
  const project = await database.project.findUnique({ where: { id: projectId }});
  const user = await database.user.findUnique({ where: { id: userId }});

  if (!project) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'project not found', 'project-not-found');
  }

  if (!user) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'user not found', 'user-not-found');
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: user.stripeCustomerId },
    { apiVersion: '2020-08-27' },
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'eur',
    customer: user.stripeCustomerId,
    metadata: {
      userId,
      amount,
      type: 'project',
      productId: projectId,
    },
  });
  return {
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: user.stripeCustomerId,
  };
}

export async function associationDonation(userId: string, associationId: string, amount: number) {
  const user = await getUser({ id: userId });

  if (user.piggyBank < amount * 100 || user.piggyBank - (amount * 100) < 0) {
    throw ErrorRo(StatusCodes.BAD_REQUEST, 'not enough in piggy bank', 'too-low-piggy-bank');
  }

  await database.donation.create({
    data: {
      amount: amount * 100,
      type: 'piggy-bank',
      User: {
        connect: { id: userId },
      },
      Association: {
        connect: { id: associationId },
      }
    }
  });

  await database.user.update({
    where: { id: userId },
    data: {
      piggyBank: {
        decrement: amount * 100,
      },
    },
    select: userSelection,
  });

  const association = await database.association.update({
    where: { id: associationId },
    data: {
      raisedCurrently: {
        increment: amount * 100
      },
    },
  });

  return association;
}

export async function associationCardPaymentLink(userId: string, associationId: string, body: DonateToProjectByCardBody) {
  const association = await database.association.findUnique({ where: { id: associationId }});

  if (!association) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'association not found', 'association-not-found');
  }

  const product = await stripe.products.create({
    name: association.name,
  });

  const price = await stripe.prices.create({
    unit_amount: body.amount * 100,
    currency: 'eur',
    product: product.id,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: body.successUrl,
    cancel_url: body.cancelUrl,
    payment_intent_data: {
      metadata: {
        userId,
        amount: body.amount,
        productId: associationId,
        type: 'association',
      }
    }
  });

  return { url: session.url };
}

export async function associationCardPaymentSheet(userId: string, associationId: string, amount: number) {
  const association = await database.association.findUnique({ where: { id: associationId }});
  const user = await database.user.findUnique({ where: { id: userId }});

  if (!association) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'association not found', 'association-not-found');
  }

  if (!user) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'user not found', 'user-not-found');
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: user.stripeCustomerId },
    { apiVersion: '2020-08-27' },
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'eur',
    customer: user.stripeCustomerId,
    metadata: {
      userId,
      amount,
      type: 'association',
      productId: associationId,
    },
  });
  return {
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: user.stripeCustomerId,
  };
}
