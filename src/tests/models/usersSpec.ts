import { users, user } from "../../models/users";

const userModel = new users();
const user:user = {
    id: 'null',
    username:'yousefkadry00',
    fname: 'yousef',
    lname: 'kadry',
    password: '123456'
}

let userExample:user ;

describe('Model testing: user model', ()=>{

    it('having create method',()=>{
        expect(userModel.create).toBeDefined();
    })

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

    it('having index method',()=>{
        expect(userModel.index).toBeDefined();
    })

    it('Testing the index method to include the userExample', async () => {
        const users = await userModel.index();
        expect(users).toContain(userExample);
        });

    it('having show method', () => {
        expect(userModel.show).toBeDefined();
        });

    it('Testing the show model to return the userExample', async () => {
        const findUser = await userModel.show(userExample.id as string);
        expect(findUser).toEqual(userExample);
        });

    it('having authenticate method', () => {
        expect(userModel.authenticate).toBeDefined();
        });

    it('Testing the authenticate model to return the fname', async () => {
        const authUser = await userModel.authenticate(user.username, user.password);
        expect(authUser!.fname).toEqual(userExample.fname)
            ;    
})

})