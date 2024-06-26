import express from 'express';
import Userrouter from './user';
export const MainRouter = express.Router()

MainRouter.use('/user',Userrouter);
// MainRouter.use('/account',accountRouter)


