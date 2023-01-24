import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dot'
import morgan from'morgan'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRotes from './routes/client'
import generalRoutes from './routes/general'
import managementRoutes from './routes/management'
import salesRoutes from './routes/sales'


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


/* Route configuration */
app.use('/api/v1/client', clientRotes)
app.use('/api/v1/general', generalRoutes)
app.use('/api/v1/managemnt', managementRoutes)
app.use('/api/v1/sales', salesRoutes)
