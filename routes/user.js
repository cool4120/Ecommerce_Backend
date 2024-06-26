const {User} = require('../db')
const express = require('express')
const Userrouter = express.Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string(),
    role:zod.string()
});
Userrouter.post('/signup', async (req,res) => {
    try{
        const {success} = signupSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({
                message:"Invalid Input"
            });
        }

        const user = await User.findOne({
            email:req.body.email
        })
        if(user._id){
            return res.status(409),json({
                message:'Email already exsists'
            });
        }
        const dbUser = User.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        })

        if(!dbUser._id){
            return res.status(400).json({
                message:'User Signup failed'
            })
        }

        const token = jwt.sign({id:req.body.email},JWT_SECRET,{ expiresIn: '7d' })
        
        return res.json({
            message:'User created Successfully',
            token:token
        })
        //Create a order History for each user


    } catch(err) {
        return res.status(400).json({
            message:err.message
        })
    }
})


const signInSchema = zod.object({
    email:zod.string(),
    password:zod.string()
})
Userrouter.post('/signin',async (req,res) => {
    try{
         const {success} = signInSchema.safeParse(req.body);
         if(!success){
            return res.status(400).json({
                message:"Invalid Input"
            });
        }

        const user = await User.findOne({
            email:req.body.email,
            password:req.password
        })

        if(!user._id){
            return res.status(400).json({
                message:'Enter right credentials'
            })
        }

        const token = jwt.sign({id:req.body.email},JWT_SECRET,{expiresIn:'7d'})

        return res.json({
            message:'Sign In Success',
            token
        })

    } catch(err) {
        return res.status(400).json({
            message:err.message
        })
    }
})


export default Userrouter;