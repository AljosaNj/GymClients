
import express from 'express'
const app =  express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'





//DB
import connectDB from './db/connect.js'

//routes
import authRouter from './routes/authRoutes.js'
import clientsRouter from './routes/clientsRoutes.js'


//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
 import authenticateUser from './middleware/auth.js'


if(process.env.NODE_ENV !== 'production'){

 app.use(morgan('dev'))
}




app.use(express.json())



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/clients', authenticateUser, clientsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000




const start = async () => {
 try {
  await connectDB(process.env.MONGO_URL)
  app.listen(port, () => {
 console.log(`Server is listening on port ${port}...`);
})
 } catch (error) {
  console.log(error);
 }
}


start()