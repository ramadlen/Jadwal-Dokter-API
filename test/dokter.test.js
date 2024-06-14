import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createManyTestDokters,
  createTestDokter,
  createTestUser,
  getTestDokter,
  removeAllTestDokter,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/dokter", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can create new dokter", async () => {
    const result = await supertest(web)
      .post("/api/dokter")
      .set("Authorization", "test")
      .send({
        dokter_name: "test",
        email: "test@ok.com",
        phone: "0809052555500",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.dokter_name).toBe("test");
    expect(result.body.data.email).toBe("test@ok.com");
    expect(result.body.data.phone).toBe("0809052555500");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/dokter")
      .set("Authorization", "test")
      .send({
        dokter_name: "",
        email: "test",
        phone: "0809000000043534534543534534543535345435435",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/dokter/:dokterId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
  });

  afterEach(async () => {
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can get dokter", async () => {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .get("/api/dokter/" + testDokter.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testDokter.id);
    expect(result.body.data.dokter_name).toBe(testDokter.dokter_name);
    expect(result.body.data.email).toBe(testDokter.email);
    expect(result.body.data.phone).toBe(testDokter.phone);
  });

  it("should return 404 if contact id is not found", async () => {
    const testContact = await getTestDokter();

    const result = await supertest(web)
      .get("/api/dokter/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/dokter/:dokterId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
  });

  afterEach(async () => {
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can update existing dokter", async () => {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .put("/api/dokter/" + testDokter.id)
      .set("Authorization", "test")
      .send({
        dokter_name: "Eko",
        email: "eko@pzn.com",
        phone: "09999999",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testDokter.id);
    expect(result.body.data.dokter_name).toBe("Eko");
    expect(result.body.data.email).toBe("eko@pzn.com");
    expect(result.body.data.phone).toBe("09999999");
  });

  it("should reject if request is invalid", async () => {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .put("/api/dokter/" + testDokter.id)
      .set("Authorization", "test")
      .send({
        dokter_name: "",
        email: "apakah@aku.com",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if dokter is not found", async () => {
    const testDokter = await getTestDokter();

    const result = await supertest(web)
      .put("/api/dokter/" + (testDokter.id + 1))
      .set("Authorization", "test")
      .send({
        dokter_name: "mira",
        email: "mira@kk.com",
        phone: "20558",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/dokter/:dokterId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestDokter();
  });

  afterEach(async () => {
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can delete dokter", async () => {
    let testDokter = await getTestDokter();
    const result = await supertest(web)
      .delete("/api/dokter/" + testDokter.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testDokter = await getTestDokter();
    expect(testDokter).toBeNull();
  });

  it("should reject if dokter is not found", async () => {
    let testDokter = await getTestDokter();
    const result = await supertest(web)
      .delete("/api/contacts/" + (testDokter.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/dokter", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestDokters();
  });

  afterEach(async () => {
    await removeAllTestDokter();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/dokter")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/dokter")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using name", async () => {
    const result = await supertest(web)
      .get("/api/dokter")
      .query({
        name: "test 1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using email", async () => {
    const result = await supertest(web)
      .get("/api/dokter")
      .query({
        email: "test1",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using phone", async () => {
    const result = await supertest(web)
      .get("/api/dokter")
      .query({
        phone: "20558d",
      })
      .set("Authorization", "test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
