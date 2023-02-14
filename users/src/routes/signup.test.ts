import request from 'supertest';
import { app } from '../app';

describe('Signup', () => {
    it('should return a 201 on succesful signup', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.test',
                password: 'Test123###Test'
            })
            .expect(201);
    });
    it('should return a 400 with an invalid email', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'test',
                password: 'Test123###Test'
            })
            .expect(400);
    });
});
