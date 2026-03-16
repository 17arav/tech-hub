import express from 'express'
// Import the controller we just made
import LocationsController from '../controllers/locations.js'

const router = express.Router()

// Define the route to get all locations
router.get('/', LocationsController.getLocations)

// Export the router
export default router