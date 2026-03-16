import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import EventsAPI from '../services/EventsAPI'
import EventCard from '../components/EventCard'

const LocationEvents = () => {
    const { id } = useParams() 
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await EventsAPI.getEventsByLocation(id)
            setEvents(data)
        }
        fetchEvents()
    }, [id])

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>🔙 Back to Hacker House Map</Link>
            
            <h2 style={{ marginTop: '2rem' }}>Scheduled Events</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {events.length > 0 ? events.map((event) => (
                    // Use our awesome new component here!
                    <EventCard key={event.id} event={event} />
                )) : <p>No events scheduled for this room yet! Grab a coffee and relax.</p>}
            </div>
        </div>
    )
}

export default LocationEvents