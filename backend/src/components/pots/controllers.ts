import { StatusCodes} from 'http-status-codes';

import database from '../../database';

import { ErrorRo } from '../../error';
import { CreatePotBody } from './entities';

export async function getPots() {
  return database.pot.findMany();
}

export async function getProjectPot(id: string) {
  return database.project.findUnique({ where: { id }}).Pot();
}

export async function createProjectPot(body: CreatePotBody, id: string) {
  const isNameAlreadyUsed = await database.pot.findFirst({
    where: {
      name: body.name,
      projectId: id
    }
  });
  if (isNameAlreadyUsed) {
    throw ErrorRo(
      StatusCodes.CONFLICT,
      `Create pot for project ${id} failed: pot's name ${body.name} is already used`,
      'name-already-used-project-pot'
    )
  }
  return database.pot.create({
    data: {
      ...body,
      project: {
        connect: { id }
      }
    }
  });
}

export async function getAssociationPots(id: string) {
  return database.association.findUnique({ where: { id }}).Pots();
}

export async function createAssociationPot(body: CreatePotBody, id: string) {
  const isNameAlreadyUsed = await database.pot.findFirst({
    where: {
      name: body.name,
      associationId: id
    }
  });
  if (isNameAlreadyUsed) {
    throw ErrorRo(
      StatusCodes.CONFLICT,
      `Create pot for project ${id} failed: pot's name ${body.name} is already used`,
      'name-already-used-project-pot'
    )
  }
  return database.pot.create({
    data: {
      ...body,
      association: {
        connect: { id }
      }
    }
  });
}
