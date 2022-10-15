import client from "../database";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = process.env.SALT_ROUNDS as string
const pepper = process.env.BCRYPT_PASSWORD as string

export type user = {
    id:string;
    fname: string;
    lname: string;
    password: string;
};

export class users{
async index(): Promise<user[]> {
    try{
        const sql:string = 'SELECT * FROM users';
        const connect = await client.connect();
        const result = await connect.query(sql);
        connect.release();
        return result.rows
    }
    catch(err){
        throw new Error(`Could not get the users. Error: ${err}`)
    }

}

async show(id:String): Promise<user>{
    try{
        const sql:string = `SELECT * FROM users WHERE id = ${id}`;
        const connect = await client.connect();
        const result = await connect.query(sql);
        connect.release();
        return result.rows[0]
    }
    catch(err){
        throw new Error(`Could not get the product. Error: ${err}`)
    }
}
async create(user:user): Promise<user>{
    try{
        const sql:string = `INSERT INTO users (fname, lname, password) VALUES ($1, $2, $3) RETURNING *` ;
        const connect = await client.connect();
        const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds))
        const result = await connect.query(sql, [user.fname, user.lname, hash]);
        connect.release();
        return result.rows[0]
    }
    catch(err){
        throw new Error(`Could not create the product. Error: ${err}`)
    }
}
async authenticate(fname:string, password:string): Promise<user|null> {
    const sql:string = `SELECT password FROM users WHERE fname='${fname}'`
    
    const connect = await client.connect();
    const hashed = await connect.query(sql)
    connect.release();
    const _password = password + pepper
    if(hashed.rows.length){
        const result = hashed.rows[0]
        if (bcrypt.compareSync(_password, result.password)) {
            return result
        }
    }
    return null

}
}