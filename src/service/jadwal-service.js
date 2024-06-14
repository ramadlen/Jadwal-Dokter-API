import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createJadwalValidation,
  getJadwalValidation,
} from "../validation/jadwal-validation.js";
import { updateDokterValidation } from "../validation/dokter-validation.js";

const checkDokterMustExists = async (user, dokterId) => {
  dokterId = validate(getJadwalValidation, dokterId);

  const totalDokterInDatabase = await prismaClient.dokter_Name.count({
    where: {
      username: user.username,
      id: dokterId,
    },
  });

  if (totalDokterInDatabase !== 1) {
    throw new ResponseError(404, "dokter tidak ditemukan");
  }

  return dokterId;
};

const create = async (user, dokterId, request) => {
  dokterId = await checkDokterMustExists(user, dokterId);

  const jadwal = validate(createJadwalValidation, request);
  jadwal.dokter_id = dokterId;

  return prismaClient.jadwal.create({
    data: jadwal,
    select: {
      id: true,
      day: true,
      date: true,
      daterange: true,
      time_start: true,
      time_finish: true,
      quota: true,
      status: true,
    },
  });
};

const get = async (user, dokterId, jadwalId) => {
  dokterId = await checkDokterMustExists(user, dokterId);
  jadwalId = validate(getJadwalValidation, jadwalId);

  const jadwal = await prismaClient.jadwal.findFirst({
    where: {
      jadwal_id: jadwalId,
      id: jadwalId,
    },
    select: {
      id: true,
      day: true,
      date: true,
      daterange: true,
      time_start: true,
      time_finish: true,
      quota: true,
      status: true,
    },
  });

  if (!jadwal) {
    throw new ResponseError(404, "jadwal dokter tidak ditemukan");
  }

  return jadwal;
};

const update = async (user, jadwalId, request) => {
  jadwalId = await checkDokterMustExists(user, jadwalId);
  const jadwal = validate(updateDokterValidation, request);

  const totalJadwalInDatabase = await prismaClient.jadwal.count({
    where: {
      jadwal_id: jadwalId,
      id: jadwal.id,
    },
  });

  if (totalJadwalInDatabase !== 1) {
    throw new ResponseError(404, "jadwal dokter tidak ditemukan");
  }

  return prismaClient.jadwal.update({
    where: {
      id: jadwal.id,
    },
    data: {
      day: jadwal.day,
      date: jadwal.date,
      daterange: jadwal.daterange,
      time_start: jadwal.time_start,
      time_finish: jadwal.time_finish,
      quota: jadwal.quota,
      status: jadwal.status,
    },
    select: {
      id: true,
      day: true,
      date: true,
      daterange: true,
      time_start: true,
      time_finish: true,
      quota: true,
      status: true,
    },
  });
};

const remove = async (user, dokterId, jadwalId) => {
  dokterId = await checkDokterMustExists(user, dokterId);
  jadwalId = validate(getJadwalValidation, jadwalId);

  const totalJadwalInDatabase = await prismaClient.jadwal.count({
    where: {
      jadwal_id: jadwalId,
      id: jadwalId,
    },
  });

  if (totalJadwalInDatabase !== 1) {
    throw new ResponseError(404, "jadwal dokter tidak ditemukan");
  }

  return prismaClient.jadwal.delete({
    where: {
      id: jadwalId,
    },
  });
};

const list = async (user, dokterId) => {
  dokterId = await checkDokterMustExists(user, dokterId);

  return prismaClient.jadwal.findMany({
    where: {
      dokter_id: dokterId,
    },
    select: {
      id: true,
      day: true,
      date: true,
      daterange: true,
      time_start: true,
      time_finish: true,
      quota: true,
      status: true,
    },
  });
};

export default {
  create,
  get,
  update,
  remove,
  list,
};
