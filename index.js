import express from 'express';
import { MainRouter } from './routes/index';
const app = express();
app.use(express.json())
app.use('/api/v1',MainRouter)

app.listen(3000,() => {
    console.log('Server Running')
})