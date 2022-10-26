import supertest from 'supertest';
import app from '../../server';
import { product } from '../../models/product';

const request = supertest(app);

describe('Testing Endpoint: /products', () => {
    const product = {
        id:'null',
        name:'iphone 13',
        price:'1000'
    }
    const user = {
        id: 'null',
        username:'yousefkadry00',
        fname: 'yousef',
        lname: 'kadry',
        password: '123456'
    }
    let token: string;
    
    beforeAll(async () => {
        await request
        .post('/user')
        .send(user)
        .expect(200)
        .then((res) => {
            token = res.body;
            
        })
    })

    it('testing the create endpoint with valid token', async () => {
        await request.post('/products').
        send(product)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })

    it('testing the create endpoint with invalid token', async () => {
        await request
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer faketoken`)
        .expect(400)
    })

    it('testing index endpoint', async () => {
        await request
        .get('/products')
        .expect(200);
    })

    it('testing show endpoint', async () => {
        await request
        .get('/products/1')
        .expect(200);
    })

    it('testing destroy endpoint', async () => {
        await request
        .delete('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    })
})