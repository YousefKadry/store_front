import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);


describe('Testing Endpoint: /order', () => {
    const order = {
        id:'null',
        user_id:1
    }
    const user = {
        id: 'null',
        username:'yousefkadry00',
        fname: 'yousef',
        lname: 'kadry',
        password: '123456'
    }

    const product = {
        id:'null',
        name:'iphone 13',
        price:'1000'
    }
    let token: string;

    beforeAll(async () => {
        await request
        .post('/user')
        .send(user)
        .expect(200)
        .then((res) => {
            token = res.body;
            
        }).then(async()=>{ await request.post('/products').
        send(product)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)} )
        
    })
    
    it('testing the create endpoint with valid token', async () => {
        await request.post('/order').
        send(order)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })


    it('testing the create endpoint with valid token', async () => {
        await request.post('/order').
        send(order)
        .set('Authorization', `Bearer faketoken`)
        .expect(400)
    })


    it('testing show endpoint with valid token', async () => {
        await request
        .get('/order/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    })

    it('testing show endpoint with invalid token', async () => {
        await request
        .get('/order/8')
        .set('Authorization', `Bearer faketoken`)
        .expect(400);
    })

    it('testing addproduct endpoint with valid token', async () => {
        await request
        .post('/order/1/addProduct')
        .send({product_id:2, quantity:"3"})
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    })

    it('testing deleteproduct endpoint with valid token', async () => {
        await request
        .delete('/order/1/deleteProduct')
        .send({product_id:2})
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    })
    it('testing complete endpoint with valid token', async () => {
        await request
        .patch('/order/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    })


})
