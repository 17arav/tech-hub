import express from 'express'
// Import the controller we just made
import EventsController from '../controllers/events.js'

const router = express.Router()

// Define the route to get all events
router.get('/', EventsController.getEvents)

// Define the route to get events for a specific Hacker House location!
router.get('/location/:locationId', EventsController.getEventsByLocation)

// Export the router
export default router