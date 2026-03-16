import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// 1. Import your routers from the routes folder
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

dotenv.config()

const app = express()

// Middleware to allow our React app to talk to this Express server
app.use(express.json())
app.use(cors())

// 2. Specify the API path for each router
// When the frontend asks for /api/locations, hand it to the locations router!
app.use('/api/locations', locationsRouter)

// When the frontend asks for /api/events, hand it to the events router!
app.use('/api/events', eventsRouter)

// A basic home route just to verify the server is running
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">🚀 Hacker House API is running!</h1>')
})

// Define the port and start the server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
})