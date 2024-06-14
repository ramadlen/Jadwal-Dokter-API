import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createDokterValidation,
  getDokterValidation,
  searchDokterValidation,
  updateDokterValidation,
} from "../validation/dokter-validation.js";

const create = async (user, request) => {
  const dokter = validate(createDokterValidation, request);
  dokter.username = user.username;

  return prismaClient.dokter_Name.create({
    data: dokter,
    select: {
      id: true,
      dokter_name: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (user, dokterId) => {
  dokterId = validate(getDokterValidation, dokterId);

  const dokter = await prismaClient.dokter_Name.findFirst({
    where: {
      username: user.username,
      id: dokterId,
    },
    select: {
      id: true,
      dokter_name: true,
      email: true,
      phone: true,
    },
  });

  if (!dokter) {
    throw new ResponseError(404, "dokter tidak ditemukan");
  }

  return dokter;
};

const update = async (user, request) => {
  const dokter = validate(updateDokterValidation, request);

  const totalDokterInDatabase = await prismaClient.dokter_Name.count({
    where: {
      username: user.username,
      id: dokter.id,
    },
  });

  if (totalDokterInDatabase !== 1) {
    throw new ResponseError(404, "dokter tidak ditemukan");
  }

  return prismaClient.dokter_Name.update({
    where: {
      id: dokter.id,
    },
    data: {
      dokter_name: dokter.dokter_name,
      email: dokter.email,
      phone: dokter.phone,
    },
    select: {
      id: true,
      dokter_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, dokterId) => {
  dokterId = validate(getDokterValidation, dokterId);

  const totalDokterInDatabase = await prismaClient.dokter_Name.count({
    where: {
      username: user.username,
      id: dokterId,
    },
  });

  if (totalDokterInDatabase !== 1) {
    throw new ResponseError(404, "dokter tidak diemukan");
  }

  return prismaClient.dokter_Name.delete({
    where: {
      id: dokterId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchDokterValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          dokter_name: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const dokters = await prismaClient.dokter_Name.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.dokter_Name.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: dokters,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
