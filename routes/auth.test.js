const request = require("supertest");
const { sequelize, Shipdata } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await sequelize.sync({});
  await Shipdata.create({
    id: 9,
    shipName: "rocket0.png",
    speed: 50,
    bulletNumber: 1,
    cost: 100,
  });
});

describe("POST /join", () => {
  test("로그인 안 한 경우 가입", (done) => {
    request(app)
      .post("/auth/join")
      .send({
        email: "testtest32@gmail.com",
        nick: "testtest2",
        password: "test1234!",
      })
      .expect(200, done);
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
