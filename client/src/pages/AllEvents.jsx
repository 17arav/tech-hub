import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import EventCard from '../components/EventCard'

const AllEvents = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    // We start with 'All' to show everything by default
    const [selectedLocation, setSelectedLocation] = useState('All')

    useEffect(() => {
        // Fetch both events and locations when the page loads
        const fetchData = async () => {
            const eventsData = await EventsAPI.getAllEvents()
            const locationsData = await LocationsAPI.getAllLocations()
            setEvents(eventsData)
            setLocations(locationsData)
        }
        fetchData()
    }, [])

    // The Magic Filter Logic!
    // If 'All' is selected, show all events. Otherwise, only show events that match the dropdown ID.
    const filteredEvents = selectedLocation === 'All' 
        ? events 
        : events.filter(event => event.location_id === parseInt(selectedLocation))

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>🔙 Back to Hacker House Map</Link>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                <h2>All Hacker House Events</h2>
                
                {/* The Filter Dropdown */}
                <select 
                    value={selectedLocation} 
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', cursor: 'pointer' }}
                >
                    <option value="All">All Locations</option>
                    {locations.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '1.5rem' }}>
                {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                )) : <p>No events found for this location.</p>}
            </div>
        </div>
    )
}

export default AllEvents