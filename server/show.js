import { pool } from './config/database.js'
import dotenv from 'dotenv'
dotenv.config()

const showData = async () => {
    try {
        console.log("\n--- Running command: SELECT * FROM events; ---\n")
        
        // This runs the exact command your grader wants to see!
        const results = await pool.query('SELECT * FROM events;')
        
        // This prints it out as a beautiful grid in your terminal
        console.table(results.rows)
        
    } catch (error) {
        console.error("Error:", error)
    } finally {
        pool.end() // Closes the connection so the terminal doesn't hang
    }
}

showData()