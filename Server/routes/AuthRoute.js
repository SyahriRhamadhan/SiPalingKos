import express from "express";
import {Login, logOut, Me, getRoot, Register, sendVerif} from "../controllers/Auth.js";

const router = express.Router();

router.get('/', getRoot);
router.get('/me', Me);
router.post('/register', Register);
router.post('/login', Login);
router.post('/sendverif', sendVerif);
router.delete('/logout', logOut);

export default router;