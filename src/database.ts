import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { POSTGRS_HOST ,
        POSTGRS_DB ,
        POSTGRS_USER ,
        POSTGRS_PASSWORD,
        PORT } = process.env;

const client = new Pool({host: POSTGRS_HOST,
                        port :(PORT as unknown) as number,
                        database: POSTGRS_DB,
                        user: POSTGRS_USER,
                        password: POSTGRS_PASSWORD});

export  default client

