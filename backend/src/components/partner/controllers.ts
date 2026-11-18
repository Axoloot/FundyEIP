import { StatusCodes } from 'http-status-codes';

import database from '../../database';
import { ErrorRo } from '../../error';
import { CreateAssociationBody, GetAssociations, CreateProjectBody, GetProjects, CreateActionBody } from './entities';

export async function getAssociations(userId: string, query: GetAssociations) {
  let associations = await database.association.findMany({
    where: { ownerId: userId },
    select: {
      id: true,
      tags: true,
      name: true,
      email: true,
      title: true,
      Actions: true,
      image: true,
      userId: true,
      latitude: true,
      longitude: true,
      createdAt: true,
      updatedAt: true,
      Donations: true,
      isVerified: true,
      description: true,
      raisedCurrently: true,
    },
  });
  if (query.tag) {
    associations = associations.filter((association) => association.tags.includes(query.tag));
  }
  if (query.q) {
    associations = associations.filter((association) => association.name.includes(query.q));
  }
  return associations;
}

export async function getAssociation(id: string) {
  const association = await database.association.findUnique({
    where: { id },
    select: {
      id: true,
      tags: true,
      name: true,
      email: true,
      title: true,
      image: true,
      userId: true,
      latitude: true,
      Donations: true,
      longitude: true,
      createdAt: true,
      updatedAt: true,
      isVerified: true,
      description: true,
      raisedCurrently: true,
    },
  });
  const actions = await database.action.findMany({ where: { associationId: association.id }});
  return {
    ...association,
    actions,
  }
}

export async function createAssociation(userId: string, data: CreateAssociationBody) {
  const isEmailAlreadyUsedForProject = await database.project.findUnique({ where: { email: data.email }});
  const isEmailAlreadyUsedForAssociation = await database.association.findUnique({ where: { email: data.email }});

  if (isEmailAlreadyUsedForAssociation) {
    throw ErrorRo(
      StatusCodes.CONFLICT,
      `Create association failed: email ${data.email} already used for an association`,
      'email-already-used-association'
    )
  } else if (isEmailAlreadyUsedForProject) {
    throw ErrorRo(
      StatusCodes.CONFLICT,
      `Create association failed: email ${data.email} already used for a project`,
      'email-already-used-project'
    )
  }
  return database.association.create({
    data: {
      ...data,
      Owner: {
        connect: { id: userId }
      }
    },
  });
}

export async function updateAssociation(associationId: string, data: CreateAssociationBody) {
  const association = await database.association.findUnique({ where: { id: associationId }});
  if (!association) {
    throw new Error('Association not found');
  }
  if (data.email && association.email !== data.email) {
    const isEmailAlreadyUsedForProject = await database.project.findUnique({ where: { email: data.email }});
    const isEmailAlreadyUsedForAssociation = await database.association.findUnique({ where: { email: data.email }});

    if (isEmailAlreadyUsedForAssociation) {
      throw ErrorRo(
        StatusCodes.CONFLICT,
        `Create association failed: email ${data.email} already used for an association`,
        'email-already-used-association'
      )
    } else if (isEmailAlreadyUsedForProject) {
      throw ErrorRo(
        StatusCodes.CONFLICT,
        `Create association failed: email ${data.email} already used for a project`,
        'email-already-used-project'
      )
    }
  }
  return database.association.update({
    where: { id: associationId },
    data: {
      ...data,
    },
  });
}

export async function getProjects(userId: string, query: GetProjects) {
  let projects = await database.project.findMany({
    where: { ownerId: userId },
    select: {
      id: true,
      tags: true,
      name: true,
      email: true,
      goal: true,
      title: true,
      image: true,
      Actions: true,
      userId: true,
      latitude: true,
      Donations: true,
      longitude: true,
      createdAt: true,
      updatedAt: true,
      isVerified: true,
      description: true,
      raisedCurrently: true,
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

export async function getProject(id: string) {
  const project = await database.project.findUnique({
    where: { id },
    select: {
      id: true,
      tags: true,
      name: true,
      email: true,
      title: true,
      image: true,
      userId: true,
      latitude: true,
      createdAt: true,
      Donations: true,
      longitude: true,
      updatedAt: true,
      isVerified: true,
      description: true,
      raisedCurrently: true,
    }
  });
  const actions = await database.action.findMany({ where: { projectId: project.id }});
  return {
    ...project,
    actions,
  }
}

export async function createProject(userId: string, data: CreateProjectBody) {
  const isEmailAlreadyUsedForProject = await database.project.findUnique({ where: { email: data.email }});
  const isEmailAlreadyUsedForAssociation = await database.association.findUnique({ where: { email: data.email }});
  if (isEmailAlreadyUsedForAssociation) {
    throw ErrorRo(
      StatusCodes.CONFLICT,
      `Create association failed: email ${data.email} already used for an association`,
      'email-already-used-association'
    )
  } else if (isEmailAlreadyUsedForProject) {
    throw ErrorRo(
      StatusCodes.CONFLICT,
      `Create association failed: email ${data.email} already used for a project`,
      'email-already-used-project'
    )
  }
  return database.project.create({
    data: {
      ...data,
      Owner: {
        connect: { id: userId }
      }
    },
  });
}

export async function updateProject(projectId: string, data: CreateProjectBody) {
  const project = await database.project.findUnique({ where: { id: projectId }});
  if (!project) {
    throw new Error('Project not found');
  }
  if (data.email && project.email !== data.email) {
    const isEmailAlreadyUsedForProject = await database.project.findUnique({ where: { email: data.email }});
    const isEmailAlreadyUsedForAssociation = await database.association.findUnique({ where: { email: data.email }});
    if (isEmailAlreadyUsedForAssociation) {
      throw ErrorRo(
        StatusCodes.CONFLICT,
        `Create association failed: email ${data.email} already used for an association`,
        'email-already-used-association'
      )
    } else if (isEmailAlreadyUsedForProject) {
      throw ErrorRo(
        StatusCodes.CONFLICT,
        `Create association failed: email ${data.email} already used for a project`,
        'email-already-used-project'
      )
    }
  }
  return database.project.update({
    where: { id: projectId },
    data: {
      ...data,
    },
  });
}

export async function getDonations(userId: string) {
  const projects = await database.project.findMany({
    where: { ownerId: userId },
  });
  const associations = await database.project.findMany({
    where: { ownerId: userId },
  });
  const pd = (await Promise.all(projects.map(async (p) => {
    const don = await database.donation.findMany({
      where: { projectId: p.id },
      include: { User: true },
    });
    return don.map((d) => ({
      ...d,
      title: p.title,
      sourceType: 'Project',
    }));
  })));
  const ad = await Promise.all(associations.map(async (a) => {
    const don = await database.donation.findMany({
      where: { associationId: a.id },
      include: { User: true },
    });
    return don.map((d) => ({
      ...d,
      title: a.title,
      sourceType: 'Association',
    }));
  }));
  // @ts-ignore
  const donations = pd.concat(ad).flat();
  // @ts-ignore
  return donations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createAction(id: string, type: string, data: CreateActionBody) {
  if (type === 'ASSOCIATION') {
    return database.action.create({
      data: {
        ...data,
        Association: {
          connect: { id }
        }
      },
    });
  }
  if (type === 'PROJECT') {
    return database.action.create({
      data: {
        ...data,
        Project: {
          connect: { id }
        }
      },
    });
  }
  throw ErrorRo(StatusCodes.BAD_REQUEST, 'invalid-type', 'type must be ASSOCIATION or PROJECT');
}

export async function updateAction(id: string, data: CreateActionBody) {
  return database.action.update({
    where: { id },
    data,
  })
}
