import {TestServer} from "./testSetup";
import userRouter from '../routes/users.routes';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

const server = new TestServer();
server.app.use('/users', userRouter);



describe('User API Tests', () =>{
    let token:string;
    beforeAll(async() => {
        await server.start();
        const hash = await bcrypt.hash("12345", 10);
        const user = User.create ({
            username: "testUser",
            password: hash,
            email: "testUser@aueb.gr",
            roles:[]});
        const payload = {
            username: user.username,
             email:user.email,
              roles: [{
                role:"READER",
                description: "Default Role",
                active: true
              }]};
        // console.log("PAYLOAD>>", payload);
        // console.log("JWT_SECRET", JWT_SECRET);
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn:'1h'});
        // console.log("TOKEN>>>>>>", token);
    });

    afterAll(async() => {await server.stop()});

    test("GET /users -> returns all users", async() => {
        const res = await server.request.get('users');
        console.log(res);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true)
  });

    test('Post /users -> create a user', async() =>{
        const res = await server.request.post('/users')
        .set('Authorization', 'Bearer ${token}')
        .send({username:"user1", password:"123456"});
        console.log("POST>>>>>>", res.status, res.body);
        expect(res.status).toBe(201);
        expect(res.body.status).toBe(true)
    })

     test('POST /users -> create a user with wrong password', async() => {
    const res = await server.request.post('/users')
      .set('Authorization', 'Bearer ${token}')
      .send(({username:'user2', password:"1234"}));

      expect(res.status).toBe(400);
    });

    test('POST /users -> create a user with wrong username', async() => {
    const res = await server.request.post('/users')
      .set('Authorization', 'Bearer ${token}')
      .send(({username:'us', password:"123456"}));

      expect(res.status).toBe(400);
    });

    test('POST /users -> create a user that exists', async() => {
    const res = await server.request.post('/users')
      .set('Authorization', 'Bearer ${token}')
      .send(({username:'user1', password:"123456"}));

      expect(res.status).not.toBe(201);
    });
})