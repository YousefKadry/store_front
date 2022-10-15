import client from "../database";

export type order = {
    user_id: number
}


export class orders {


    async show_current(id:string): Promise<order[]>{
        try{
            const sql:string = `SELECT * FROM orders WHERE id = ${id} AND status = 'active'`;
            const connect = await client.connect();
            const result = await connect.query(sql);
            connect.release();
            return result.rows
        }
        catch(err){
            throw new Error(`Could not get the orders. Error: ${err}`)
        }
    }

    async create(order:order): Promise<order>{
        try{
            const sql:string = `INSERT INTO orders (user_id, status) VALUES ($1, active)`;
            const connect = await client.connect();
            const result = await connect.query(sql, [order.user_id]);
            connect.release();
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not create the order. Error: ${err}`)
        }
    }

    async complete_order(id:string): Promise<order>{
        try{
            const sql:string = `UPDATE orders SET status = "complete" WHERE id = ${id}`
            const connect = await client.connect();
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not complete the the orders. Error: ${err}`)
        }
    }
}