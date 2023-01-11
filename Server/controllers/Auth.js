import User from "../models/UserModel.js";
import argon2 from "argon2";
import sendEmail from "../utils/sendEmail.js";
export const getRoot = async(req, res) => {
    res.status(200).json({
      status: "OK",
      message: "SiPalingKos API is up and running!",
    });
}

export const Register = async(req, res) =>{
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const {name, email, password, confPassword, role} = req.body;
    const user = await User.findOne({ 
        where: { email: email } 
    });
    if (user) {
        res.status(400).json({ msg: "Email sudah terdaftar" });
        return;
    } 
    if (!passwordRegex.test(password)) {
        return res.status(400).json({msg: "Password harus teridiri dari angka, huruf besar, huruf kecil dan 8 karakter"});
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const sendVerif = async (req, res) =>{
    try {
        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        const url = `${process.env.BASE_URL}users/${user.id}/verify`;
        await sendEmail(user.email, "Verify Email", url);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}