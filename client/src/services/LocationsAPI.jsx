const API_URL = 'http://localhost:3000/api/locations'

const getAllLocations = async () => {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Failed to fetch locations')
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching locations:', error)
        return [] // Return an empty array if it fails so React doesn't crash
    }
}

export default {
    getAllLocations
}