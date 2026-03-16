import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import '../App.css' // Import our cool new styles!

const Locations = () => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchLocations = async () => {
            const data = await LocationsAPI.getAllLocations()
            setLocations(data)
        }
        fetchLocations()
    }, [])

    return (
        <div style={{ padding: '2rem' }}>
            <h1>🏢 THE HACKER HOUSE</h1>
            <p style={{ textAlign: 'center' }}>Select a sector to view active events</p>
            
            <Link to="/events" style={{ textDecoration: 'none' }}>
                <button className="neon-btn">
                    [ ACCESS ALL EVENTS ]
                </button>
            </Link>
            
            {/* Here is our CSS Grid Floorplan! */}
            <div className="floorplan">
                {locations.length > 0 ? locations.map((location) => (
                    <Link to={`/location/${location.id}`} key={location.id} style={{ textDecoration: 'none' }}>
                        <div className="room-card">
                            <h3>{location.name}</h3>
                        </div>
                    </Link>
                )) : <h3>System loading...</h3>}
            </div>
        </div>
    )
}

export default Locations