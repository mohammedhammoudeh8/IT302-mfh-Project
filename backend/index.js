import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import CompetitionsDAO from './dao/competitionsDAO.js';
import competitionsRouter from './api/competitions.route.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
async function init() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    await CompetitionsDAO.injectDB(db, process.env.COMPETITIONS_COLLECTION_NAME);
    const base = `/api/v1/${process.env.UCID}/competitions`;
    app.use(base, competitionsRouter);
    app.get('/', (req, res) => res.json({ status: 'ok', endpoints: { competitions: base } }));
    console.log(`[IT302] Connected and routes mounted at ${base}`);
  } catch (e) { console.error(e); process.exit(1); }
}
init();
export default app;
