const pool = require("../util/mysql");
const request = require("supertest");
const app = require("../app");

// process.env.NODE_ENV = "test";

//beforeAll: called once before all tests
beforeAll(async () => {
  try {
    await pool.query(`
            INSERT INTO user (name, email, password)
            VALUES ('Existing User', 'existing@example.com', 'password');        
        `);
  } catch (error) {
    console.error("Error creating test data:", error);
  }
});

// afterAll: called once after all tests.
afterAll(async () => {
  try {
    await pool.query(`
      DELETE FROM user
      WHERE name = 'Existing User';
    `);
    await pool.query(`
      DELETE FROM user
      WHERE name = 'unitTest-1';
    `);
    pool.releaseConnection();
  } catch (error) {
    console.error("Error releasing connection:", error);
  }
});

describe("POST signUp test /", () => {
  test("Return 200 and access token if signup is successful", async () => {
    const newUser = {
      name: "unitTest-1",
      email: "unitTest-1@example.com",
      password: "password",
    };

    const response = await request(app)
      .post("/api/1.0/users/signup")
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.data.access_token).toBeDefined();
    expect(response.body.data.user).toBeDefined();
  });
  test("Return 400 if request body is missing any field", async () => {
    const newUser = {
      name: "unitTest-1",
      // email: "new3@example.com",
      password: "password",
    };

    const response = await request(app)
      .post("/api/1.0/users/signup")
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Missing input feild");
  });
  test("Return 400 if email is invalid", async () => {
    const newUser = {
      name: "unitTest-1",
      email: "invalid_email",
      password: "password",
    };

    const response = await request(app)
      .post("/api/1.0/users/signup")
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid email format.");
  });
  test("Return 403 if email already exists", async () => {
    const existingUser = {
      name: "Existing User",
      email: "existing@example.com",
      password: "password",
    };

    const response = await request(app)
      .post("/api/1.0/users/signup")
      .send(existingUser);

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("Email already exists");
  });
});
