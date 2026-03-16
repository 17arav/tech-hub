const API_URL = 'http://localhost:3000/api/events'

const getAllEvents = async () => {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Failed to fetch events')
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events:', error)
        return []
    }
}

const getEventsByLocation = async (locationId) => {
    try {
        const response = await fetch(`${API_URL}/location/${locationId}`)
        if (!response.ok) throw new Error('Failed to fetch events for this location')
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events by location:', error)
        return []
    }
}

export default {
    getAllEvents,
    getEventsByLocation
}