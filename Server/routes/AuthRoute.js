import express from "express";
import {Login, logOut, Me, getRoot} from "../controllers/Auth.js";

const router = express.Router();

router.get('/', getRoot);
router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;