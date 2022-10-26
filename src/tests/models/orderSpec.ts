import { order, orders } from "../../models/orders";
import { users, user } from "../../models/users";



const orderModel = new orders();
const userModel = new users();
const user:user = {
    id: 'null',
    username:'yousefkadry00',
    fname: 'yousef',
    lname: 'kadry',
    password: '123456'
}
const order: order = {
    id:'0',
    user_id: 1 ,
    status :'active'
}



let orderExample:order;
let userExample:user

describe('Model testing: user model', async ()=>{
    it('Testing the create method with a user', async ()=>{
        userExample = await userModel.create(user)
        expect({
            username:userExample.username,
            fname: userExample.fname,
            lname: userExample.lname})
            .toEqual({
            username:'yousefkadry00',
            fname: 'yousef',
            lname: 'kadry',
            }
        );
    })

    it('having create method',()=>{
        expect(orderModel.create).toBeDefined();
    })

    it('Testing the create method with a order', async ()=>{
        orderExample = await orderModel.create(order)
        expect({
            user_id: orderExample.user_id ,
            status: orderExample.status})
            .toEqual({
                user_id: 1,
                status :'active'
            }
        );
    })

    it('having index show_current',()=>{
        expect(orderModel.show_current).toBeDefined();
    })

    it('Testing the show method to return the orderExample', async () => {
        const findorder = await orderModel.show_current('1');
        expect(findorder).toContain(orderExample);
        })

    it('having index complete order',()=>{
        expect(orderModel.complete_order).toBeDefined();
    })
    
    it('Testing the complete_order method to edit the status to complete', async () => {
        const completedorder = await orderModel.complete_order(orderExample.id as string);
        expect(completedorder.status).toContain('complete');
        })
})