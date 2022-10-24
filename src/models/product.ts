import client from "../database";

export type product = {
    id:string;
    name: string;
    price: Number;
};

export class products{
async index(): Promise<product[]> {
    try{
        const sql:string = 'SELECT * FROM products';
        const connect = await client.connect();
        const result = await connect.query(sql);
        connect.release();
        return result.rows
    }
    catch(err){
        throw new Error(`Could not get the products. Error: ${err}`)
    }

}

async show(id:String): Promise<product>{
    try{
        const sql:string = `SELECT * FROM products WHERE id = ${id}`;
        const connect = await client.connect();
        const result = await connect.query(sql);
        connect.release();

        return result.rows[0]
    }
    catch(err){
        throw new Error(`Could not get the product. Error: ${err}`)
    }
}
async create(product:product): Promise<product>{
    try{
        const sql:string = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
        const connect = await client.connect();
        const result = await connect.query(sql, [product.name, product.price]);
        connect.release();
        return result.rows[0]
    }
    catch(err){
        throw new Error(`Could not create the product. Error: ${err}`)
    }
}
async delete(id:string): Promise<product>{
    try{
        console.log('gg')
        const sql:string = `delete FROM products WHERE id = ${id}`;
        const connect = await client.connect();
        const result = await connect.query(sql);
        connect.release();
        return result.rows[0]
    }
    catch(err){
        throw new Error(`Could not delete the product. Error: ${err}`)
    }
}
}
