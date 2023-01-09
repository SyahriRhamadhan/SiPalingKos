import express from "express";
import {
    getUsers,
    getUserById,
    Register,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/register', Register);
router.patch('/users/update', verifyUser, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;