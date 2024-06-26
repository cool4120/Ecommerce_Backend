const {User} = require('../db')
const express = require('express')
const router = express.Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string(),
    role:zod.string()
});
router.post('/signup', async (req,res) => {
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
            return res.status(400),json({
                message:'Email already exsists'
            });
        }


    } catch(err) {

    }
})

const signInSchema = zod.object({
    email:zod.string(),
    password:zod.string()
})
router.post('/signin',async (req,res) => {
    try{
         const {success} = signInSchema.safeParse(req.body);
         if(!success){
            return res.status(400).json({
                message:"Invalid Input"
            });
        }

        const user = await User.findOne({
            email:req.body.email
        })

        if(!user._id){
            return res.status(400).json({
                message:'Invalid Email (doesnt exsist)'
            })
        }


    } catch(err) {

    }
})

module.exports = router