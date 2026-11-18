import { StatusCodes } from 'http-status-codes';

import database from '../../database';
import { ErrorRo } from '../../error';
import { CreateAssociationBody, GetAssociations } from './entities';

export async function getAssociations(query: GetAssociations) {
  let associations = await database.association.findMany({
    include: {
      Actions: true,
      Donations: true,
    }
  });
  if (query.tag) {
    associations = associations.filter((association) => association.tags.includes(query.tag));
  }
  if (query.q) {
    associations = associations.filter((association) => association.name.includes(query.q));
  }
  return associations;
}

export async function getTrendingAssociations() {
  const currentDate = new Date();
  const lastWeekDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);

  const associations = await database.association.findMany({
    include: {
      Actions: true,
      Donations: true,
    }
  });
  let weeklyAssociations = await database.association.findMany({
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
  if (weeklyAssociations.length === 0) {
    weeklyAssociations = await database.association.findMany({
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
  const projectWithDonation = await Promise.all(associations.map(async (p) => {
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
    return { ...associations, weeklyDonations: donations._count }
  }));
  const trendingDonations = projectWithDonation.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.weeklyDonations === value.weeklyDonations
    ))
  );
  return { weeklyAssociations, trendingDonations };
}

export async function getAssociation(id: string) {
  const association = await database.association.findUnique({
    where: { id },
    include: {
      Actions: true,
      Donations: true,
      Owner: true,
    }
  });
  if (!association) {
    throw ErrorRo(StatusCodes.NOT_FOUND, 'association not found', 'association-not-found');
  }
  return association;
}
