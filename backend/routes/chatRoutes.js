
import express from 'express';
const router = express.Router();
import { generateChatResponse } from '../controllers/chatController.js';

router.post('/', generateChatResponse);

export default router;