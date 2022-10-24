import supertest from 'supertest';
import app from '../../server';
import { JwtPayload, verify } from 'jsonwebtoken';
import { user } from '../../models/users';

const request = supertest(app);

describe('Testing Endpoint: /user', () => {
    const user = {
        id: 'null',
        fname: 'yousef',
        lname: 'kadry',
        password: '123456'
    }
    let token: string;
    let user_id: string;


    it('testing the create endpoint', async () => {
        await request.post('/user').
        send(user)
        .expect(200)
        .then((res) => {
            token = res.body;
            // console.log(token)
            const decoded = verify(
                token as string,
                process.env.TOKEN_SECRET as string
            ) as JwtPayload;
            user_id = decoded.id;
        })
    })


    it('testing index endpoint with valid token', async () => {
        await request.get('/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    })


    it('testing index endpoint with invalid token', async () => {
        await request.get('/user')
        .set('Authorization', `Bearer faketoken`)
        .expect(400);
    })


    it('Testing the show endpoint with valid token', async () => {
        await request
            .get(`/user/${user_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });


    it('Testing the show endpoint with invalid token', async () => {
        await request
            .get(`/user/${user_id}`)
            .set('Authorization', `Bearer faketoken`)
            .expect(400);
    });


    it('Testing the authorization endpoint with user', async () => {
        await request
        .post('/user/signin')
        .send(user)
        .expect(200);
    });

})