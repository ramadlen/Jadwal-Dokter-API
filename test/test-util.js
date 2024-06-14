import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestDokter = async () => {
  await prismaClient.dokter_Name.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestDokter = async () => {
  await prismaClient.dokter_Name.create({
    data: {
      username: "test",
      dokter_name: "test",
      email: "test@gmail.com",
      phone: "080900000",
    },
  });
};

export const createManyTestDokters = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.dokter_Name.create({
      data: {
        username: `test`,
        dokter_name: `test ${i}`,
        email: `test${i}@ok.com`,
        phone: `080900000${i}`,
      },
    });
  }
};

export const getTestDokter = async () => {
  return prismaClient.dokter_Name.findFirst({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestJadwal = async () => {
  await prismaClient.jadwal.deleteMany({
    where: {
      dokter: {
        username: "test",
      },
    },
  });
};

export const createTestJadwal = async () => {
  const dokter = await getTestContact();
  await prismaClient.jadwal.create({
    data: {
      dokter_id: dokter.id,
      date: new Date(),
      date_range: new Date(),
      time_start: new Date(),
      time_finish: new Date(),
      quota: 10,
      status: true,
    },
  });
};

export const getTestJadwal = async () => {
  return prismaClient.jadwal.findFirst({
    where: {
      dokter: {
        username: "test",
      },
    },
  });
};
