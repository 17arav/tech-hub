import React, { useState, useEffect } from 'react'

const EventCard = ({ event }) => {
    // 1. Calculate the time remaining
    const calculateTimeLeft = () => {
        const difference = new Date(event.date_time) - new Date()
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        }
        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    // 2. Set up a live ticking clock!
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        // Clean up the timer when we leave the page
        return () => clearInterval(timer)
    }, [event.date_time])

    // 3. Check if the event is in the past
    const isPast = new Date(event.date_time) < new Date()

    return (
        <div style={{ 
            border: '1px solid #ccc', 
            padding: '1.5rem', 
            borderRadius: '8px',
            backgroundColor: isPast ? '#f4f4f4' : '#ffffff',
            opacity: isPast ? 0.7 : 1
        }}>
            {/* If it's past, cross out the text! */}
            <h3 style={{ margin: '0 0 10px 0', textDecoration: isPast ? 'line-through' : 'none' }}>
                {event.title}
            </h3>
            
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>
                <strong>When:</strong> {new Date(event.date_time).toLocaleString()}
            </p>
            <p style={{ margin: '0 0 15px 0' }}>{event.description}</p>
            
            {/* The Timer Display */}
            <div style={{ 
                fontWeight: 'bold', 
                padding: '10px', 
                borderRadius: '5px',
                backgroundColor: isPast ? '#ffebee' : '#e8f5e9',
                color: isPast ? '#c62828' : '#2e7d32',
                display: 'inline-block'
            }}>
                {isPast ? 
                    "🚨 This event has already passed" : 
                    `⏳ Starts in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
                }
            </div>
        </div>
    )
}

export default EventCard