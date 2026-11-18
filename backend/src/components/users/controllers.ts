import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { User } from '@prisma/client';
import { createCanvas } from 'canvas';

import database from '../../database';
import { ErrorRo } from '../../error';
import { userSelection, ModifyUser } from './entities';

export function createProfilePicture(firstname: string, lastname: string) {
  const l1 = firstname[0];
  const l2 = lastname[1];

  const canvas = createCanvas(100, 100);
  const context = canvas.getContext('2d');
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const r = 50;

  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI, false);
  const colors = ['#EC8985', '#A2BFF8', '#F1CF73'];
  context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
  context.fill();

  context.font = 'bold 60px Menlo';
  context.textAlign = 'center';
  context.fillStyle = '#fff';
  context.fillText(`${firstname[0]}${lastname[0]}`, 50, 70);

  return canvas.toBuffer();
}

export async function modifyProfilePicture(userId: string, picture: Buffer) {
  await database.user.update({
    where: { id: userId },
    data: {
      profilePicture: picture.toString('base64'),
    },
    select: userSelection,
  });
}

export async function doesUserExist(where: Prisma.UserWhereUniqueInput) {
  try {
    await getUser(where);
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteUser(id: string) {
  const userExists = doesUserExist({ id });

  if (!userExists) {
    throw ErrorRo(StatusCodes.NOT_FOUND, `user ${id} not found`, 'user-not-found');
  }

  return database.user.delete({
    where: { id },
    select: userSelection,
  });
}

export async function getUser(where: Prisma.UserWhereUniqueInput) {
  const user = await database.user.findUnique({
    where,
    select: userSelection,
  });

  if (user === null) {
    throw ErrorRo(StatusCodes.NOT_FOUND, `user ${JSON.stringify(where)} not found`, 'user-not-found');
  }

  return user;
}

export async function modifyUser(id: string, body: ModifyUser) {
  return database.user.update({
    where: { id },
    data: body
  });
}

export async function followProject(userId: string, projectId: string) {
  try {
    const user = await database.user.update({
      where: { id: userId },
      data: {
        FollowedProjects: {
          connect: { id: projectId }
        }
      },
      select: { FollowedProjects: true },
    });
    return user.FollowedProjects;
  } catch (error) {
    throw ErrorRo(StatusCodes.BAD_REQUEST, 'invalid project or user', 'invalid-project-or-user');
  }
}

export async function unfollowProject(userId: string, projectId: string) {
  try {
    const user = await database.user.update({
      where: {id: userId},
      data: {
        FollowedProjects: {
          disconnect: { id: projectId }
        }
      },
      select: { FollowedProjects: true },
    });
    return user.FollowedProjects;
  } catch (error) {
    console.log(error)
    throw ErrorRo(StatusCodes.BAD_REQUEST, 'invalid project or user', 'invalid-project-or-user');
  }
}

export async function followAssociation(userId: string, associationId: string) {
  try {
    const user = await database.user.update({
      where: {id: userId},
      data: {
        FollowedAssociation: {
          connect: { id: associationId }
        }
      },
      select: { FollowedAssociation: true },
    });
    return user.FollowedAssociation;
  } catch (error) {
    throw ErrorRo(StatusCodes.BAD_REQUEST, 'invalid project or user', 'invalid-project-or-user');
  }
}

export async function unfollowAssociation(userId: string, associationId: string) {
  try {
    const user = await database.user.update({
      where: {id: userId},
      data: {
        FollowedAssociation: {
          disconnect: { id: associationId }
        }
      },
      select: { FollowedAssociation: true },
    });
    return user.FollowedAssociation;
  } catch (error) {
    console.log(error)
    throw ErrorRo(StatusCodes.BAD_REQUEST, 'invalid project or user', 'invalid-project-or-user');
  }
}

export async function getTransactions(user: User) {
  try {
    return database.transaction.findMany({ where: { userId: user.id } })
  } catch (error) {
    console.error(error);
  }
}

export async function getDonations(user: User) {
  try {
    console.log(await database.donation.findMany({ where: { userId: user.id } }))
    return database.donation.findMany({ where: { userId: user.id } })
  } catch (error) {
    console.error(error);
  }
}

export async function verifyEmail(userId: string, token: string) {
  if (token !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c') {
    throw new Error('Invalid token');
  }
  await database.user.update({
    where: { id: userId },
    data: { isVerified: true },
  });
  return { message: 'success' };
}
