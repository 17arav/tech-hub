import { pool } from './database.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' }) // Make sure it can find your .env file

const seedDatabase = async () => {
    // 1. Drop existing tables if they exist so we can start fresh
    const dropTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;
    `

    // 2. Create the Locations table
    const createLocationsTableQuery = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image_url TEXT,
            description TEXT
        );
    `

    // 3. Create the Events table (linked to locations via location_id)
    const createEventsTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date_time TIMESTAMP NOT NULL,
            location_id INTEGER REFERENCES locations(id),
            image_url TEXT,
            description TEXT
        );
    `

    // 4. Insert our 4 Hacker House Rooms
    const insertLocationsQuery = `
        INSERT INTO locations (name, image_url, description) VALUES
        ('The Main Stage', 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6', 'The heart of the Hacker House for big presentations.'),
        ('The Basement', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', 'Dark, quiet, and packed with servers. Perfect for deep work.'),
        ('The Cafe', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', 'Fuel up on caffeine and network with fellow devs.'),
        ('The Rooftop', 'https://images.unsplash.com/photo-1533105079780-92b9be482077', 'Chill vibes, fresh air, and city views.')
    `

    // 5. Insert dummy events for each room (Location IDs 1 through 4)
    const insertEventsQuery = `
        INSERT INTO events (title, date_time, location_id, image_url, description) VALUES
        ('Startup Pitch Night', '2026-04-10 19:00:00', 1, '', 'Watch 5 startups pitch their latest ideas to local investors.'),
        ('React Workshop', '2026-04-12 14:00:00', 1, '', 'A deep dive into React hooks and state management.'),
        ('Midnight Hackathon', '2026-04-15 23:59:00', 2, '', '24 hours to build a working prototype. Energy drinks provided.'),
        ('Cybersecurity CTF', '2026-04-18 10:00:00', 2, '', 'Capture The Flag competition. Find the vulnerabilities first.'),
        ('Morning Coffee & Code', '2026-04-05 08:30:00', 3, '', 'Start your day right with a latte and some pair programming.'),
        ('Board Game Night', '2026-04-20 18:00:00', 3, '', 'Unplug and play some Catan and Ticket to Ride.'),
        ('Developer Yoga', '2026-04-06 17:00:00', 4, '', 'Stretch out those desk-posture kinks at sunset.'),
        ('Sunset Happy Hour', '2026-04-25 18:30:00', 4, '', 'Celebrate the end of the sprint with drinks on the roof.')
    `

    try {
        console.log('⏳ Dropping old tables...')
        await pool.query(dropTablesQuery)
        
        console.log('⏳ Creating locations table...')
        await pool.query(createLocationsTableQuery)
        
        console.log('⏳ Creating events table...')
        await pool.query(createEventsTableQuery)
        
        console.log('⏳ Inserting Hacker House locations...')
        await pool.query(insertLocationsQuery)
        
        console.log('⏳ Inserting Hacker House events...')
        await pool.query(insertEventsQuery)
        
        console.log('✅ Database seeded successfully!')
    } catch (error) {
        console.error('❌ Error seeding database:', error)
    } finally {
        pool.end() // Close the connection when done
    }
}

seedDatabase()