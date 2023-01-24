import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRotes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'
import connectDB from './db/connect.js'

/* CONFIGURATION */
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(xss())
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)


/* Route configuration */
app.use('/api/v1/client', clientRotes)
app.use('/api/v1/general', generalRoutes)
app.use('/api/v1/managemnt', managementRoutes)
app.use('/api/v1/sales', salesRoutes)


/* Mongoose configuration */
const Port = process.env.PORT || 5000
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL)
      app.listen(Port, () =>
        console.log(`Server is listening on port ${Port}...`)
      );
    } catch (error) {
      console.log(error)
    }
  }
  
  
  start()
