const express = require('express')
const app = express()
const userRouter = require('./user')
const router = express.Router()

router.use('/user',userRouter);
router.use('/account',accountRouter)