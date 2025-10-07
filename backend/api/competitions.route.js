import express from 'express';
import CompetitionsController from './competitions.controller.js';
const router = express.Router();
router.get('/', CompetitionsController.apiGetCompetitions);
export default router;