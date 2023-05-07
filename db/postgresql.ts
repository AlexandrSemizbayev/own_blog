import { Pool } from 'pg';
import {config} from './config';

const defaultQuery = 'SELECT * FROM blogs';

export const connectToDB = async (query: string = defaultQuery) => {
    try {
      const pool = new Pool(config);
      await pool.connect()
      const res = await pool.query(query)
      console.log(res)
      // await pool.end();
      console.log('pool end');
      return pool;
    } catch (error) {
      console.log(error)
    }
};