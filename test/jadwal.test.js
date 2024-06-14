import {
  createTestDokter,
  createTestJadwal,
  createTestUser,
  getTestDokter,
  getTestJadwal,
  removeAllTestDokter,
  removeAllTestJadwal,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";

describe("POST /api/dokter/:dokterId/jadwal", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
  });

  afterEach(async () => {
    await removeAllTestJadwal();
    await removeAllTestJadwal();
    await removeTestUser();
  });

  it("should can create new address", async () => {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .post("/api/dokter/" + testDokter.id + "/jadwal")
      .set("Authorization", "test")
      .send({
        dokter_id: testDokter.id,
        day: "monday",
        date: "2023-06-15 15:51:55",
        date_range: "2023-06-15 15:51:55",
        time_start: "2023-06-15 15:51:55",
        time_finish: "2023-06-15 15:51:55",
        quota: 10,
        status: true,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.dokter_id).toBeDefined();
    expect(result.body.data.day).toBeDefined("monday");
    expect(result.body.data.date).toBe("2023-06-15 15:51:55");
    expect(result.body.data.date_range).toBe("2023-06-15 15:51:55");
    expect(result.body.data.time_start).toBe("2023-06-15 15:51:55");
    expect(result.body.data.time_finish).toBe("2023-06-15 15:51:55");
    expect(result.body.data.quota).toBe(10);
    expect(result.body.data.status).toBe(true);
  });

  it("should reject if address request is invalid", async () => {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .post("/api/dokter/" + testDokter.id + "/jadwal")
      .set("Authorization", "test")
      .send({
        dokter_id: testDokter.id,
        day: "monday",
        date: "2023-06-15 15:51:55",
        date_range: "2023-06-15 15:51:55",
        time_start: "2023-06-15 15:51:55",
        time_finish: "2023-06-15 15:51:55",
        quota: 10,
        status: true,
      });

    expect(result.status).toBe(400);
  });

  it("should reject if dokter is not found", async () => {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .post("/api/dokter/" + (testDokter.id + 1) + "/jadwal")
      .set("Authorization", "test")
      .send({
        dokter_id: testDokter.id,
        day: "monday",
        date: "2023-06-15 15:51:55",
        date_range: "2023-06-15 15:51:55",
        time_start: "",
        time_finish: "",
        quota: 0,
        status: true,
      });

    expect(result.status).toBe(404);
  });
});

describe("GET /api/dokter/:dokterId/jadwal/:jadwalId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
    await createTestJadwal();
  });

  afterEach(async () => {
    await removeAllTestJadwal();
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can get dokter", async () => {
    const testDokter = await getTestDokter();
    const testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .get("/api/dokter/" + testDokter.id + "/jadwal/" + testJadwal.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.dokter_id).toBeDefined();
    expect(result.body.data.day).toBe("");
    expect(result.body.data.date_range).toBe("2023-06-15 15:51:55");
    expect(result.body.data.time_start).toBe("2023-06-15 15:51:55");
    expect(result.body.data.time_finish).toBe("2023-06-15 15:51:55");
    expect(result.body.data.quota).toBe("234234");
    expect(result.body.data.status).toBe(false);
  });

  it("should reject if dokter is not found", async () => {
    const testDokter = await getTestDokter();
    const testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .get("/api/dokter/" + (testDokter.id + 1) + "/jadwal/" + testJadwal.id)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });

  it("should reject if address is not found", async () => {
    const testDokter = await getTestDokter();
    const testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .get("/api/dokter/" + testDokter.id + "/jadwal/" + (testJadwal.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/dokter/:dokterId/jadwal/:jadwalId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
    await createTestJadwal();
  });

  afterEach(async () => {
    await removeAllTestJadwal();
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can update address", async () => {
    const testDokter = await getTestDokter();
    const testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .put("/api/dokter/" + testDokter.id + "/jadwal/" + testJadwal.id)
      .set("Authorization", "test")
      .send({
        dokter_id: testDokter.id,
        day: "monday",
        date: "2023-06-15 15:51:55",
        date_range: "2023-06-15 15:51:55",
        time_start: "2023-06-15 15:51:55",
        time_finish: "2023-06-15 15:51:55",
        quota: 10,
        status: true,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.dokter_id).toBe(testJadwal.id);
    expect(result.body.data.day).toBe("monday");
    expect(result.body.data.date).toBe("2023-06-15 15:51:55");
    expect(result.body.data.date_range).toBe("2023-06-15 15:51:55");
    expect(result.body.data.time_start).toBe("2023-06-15 15:51:55");
    expect(result.body.data.time_finish).toBe("2023-06-15 15:51:55");
    expect(result.body.data.quota).toBe("11");
    expect(result.body.data.status).toBe(true);
  });

  it("should reject if request is not valid", async () => {
    const testDokter = await getTestDokter();
    const testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .put("/api/dokter/" + testDokter.id + "/jadwal/" + testJadwal.id)
      .set("Authorization", "test")
      .send({
        dokter_id: testDokter.id,
        day: "",
        date: "2023-06-15 15:51:55",
        date_range: "",
        time_start: "",
        time_finish: "",
        quota: 10,
        status: true,
      });

    expect(result.status).toBe(400);
  });

  it("should reject if jadwal is not found", async () => {
    const testDokter = await getTestDokter();
    const testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .put("/api/dokter/" + testDokter.id + "/jadwal/" + (testJadwal.id + 1))
      .set("Authorization", "test")
      .send({
        dokter_id: testDokter.id,
        day: "senin",
        date: "2023-06-15 15:51:55",
        date_range: "d",
        time_start: "d",
        time_finish: "d",
        quota: 10,
        status: true,
      });

    expect(result.status).toBe(404);
  });

  it("should reject if dokter is not found", async () => {
    const testDokter = await getTestDokter();
    const testJadwal = await getTestAddress();

    const result = await supertest(web)
      .put("/api/dokter/" + (testContact.id + 1) + "/jadwal/" + testJadwal.id)
      .set("Authorization", "test")
      .send({
        dokter_id: testDokter.id,
        day: "senin",
        date: "2023-06-15 15:51:55",
        date_range: "d",
        time_start: "d",
        time_finish: "d",
        quota: 10,
        status: true,
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/dokter/:dokterId/jadwal/:jadwalId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
    await createTestJadwal();
  });

  afterEach(async () => {
    await removeAllTestJadwal();
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can remove jadwal", async () => {
    const testDokter = await getTestDokter();
    let testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .delete("/api/dokter/" + testDokter.id + "/jadwal/" + testJadwal.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testJadwal = await getTestJadwal();
    expect(testJadwal).toBeNull();
  });

  it("should reject if jadwal is not found", async () => {
    const testDokter = await getTestDokter();
    let testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .delete("/api/dokter/" + testDokter.id + "/jadwal/" + (testJadwal.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });

  it("should reject if dokter is not found", async () => {
    const testDokter = await getTestDokter();
    let testJadwal = await getTestJadwal();

    const result = await supertest(web)
      .delete("/api/dokter/" + (testDokter.id + 1) + "/jadwal/" + testJadwal.id)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/dokter/:dokterId/jadwal", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
    await createTestJadwal();
  });

  afterEach(async () => {
    await removeAllTestJadwal();
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can list jadwal", async function () {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .get("/api/dokter/" + testDokter.id + "/jadwal")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it("should reject if dokter is not found", async function () {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .get("/api/dokter/" + (testDokter.id + 1) + "/jadwal")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});
