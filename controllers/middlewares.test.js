jest.mock("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./middlewares");

describe("verifyToken", () => {
  const token = jwt.sign(
    {
      id: 144,
      type: "premium",
      email: "testtest@gmail.com",
      nick: "testnicktest",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "6000000m",
      issuer: "KYOL",
    }
  );
  const req = {
    headers: {
      authorization: token,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  const next = jest.fn();

  test("token이 유효한 경우", () => {
    verifyToken(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("token 유효기간이 만료한 경우", async () => {
    const error = { name: "TokenExpiredError" };
    jwt.verify.mockImplementation(() => {
      throw error;
    });
    await verifyToken(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      message: "expired",
    });
  });

  test("token이 유효하지 않은 경우", async () => {
    const error = { name: "TokenInvalid" };
    jwt.verify.mockImplementation(() => {
      throw error;
    });
    await verifyToken(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      message: "invalidt",
    });
  });
});
