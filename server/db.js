const {Client} = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/the_acme_reservation_planner_db');


async function createTables() {
    try {
        await client.connect();
        await client.query(`
        CREATE TABLE IF NOT EXISTS Customer (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Restaurant (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Reservation (
            id UUID PRIMARY KEY,
            date DATE NOT NULL,
            party_count INTEGER NOT NULL,
            restaurant_id UUID REFERENCES Customer(id) NOT NULL
        );
        `);
        console.log ("Tables create successfully");
    } catch(error) {
        console.error("Error creating tables:", error);
    }
}

async function createCustomer(name) {
    try {
        const result = await client.query('INSERT INTO Customer (id, name) VALUES (uuid_generate_v4(), $1) RETURNING *', [name]);
        return result.rows[0];
    } catch(error) {
        console.error("Error creating customer:", error);
    }
}

async function createRestaurant(name) {
    try {
        const result = await client.query('INSERT INTO Restaurant (id, name) VALUES (uuid_generate_v4(), $1) RETURNING *', [name]);
        return result.rows[0];
    } catch(error) {
        console.error("Error creating restaurant:", error);
    }
}

async function fetchCustomers() {
    try {
        const result = await client.query('SELECT * FROM Customer');
        return result.rows;
    }catch (error) {
        console.error('Error fetching customers:', error);
    }
}

async function fetchRestaurants() {
    try {
        const result = await client.query('SELECT * FROM Restaurant');
        return result.rows;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
}

async function createReservation(date, party_count, restaurant_id, customer_id) {
    try {
        const result = await client.query(
            'INSERT INTO Reservation (id, date, party_count, restaurant_id, customer_id) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *',
            [date, party_count, restaurant_id, customer_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating reservation:', error);
    }
}

async function destroyReservation(id) {
    try {
        await client.query('DELETE FROM Reservation WHERE id = $1', [id]);
    } catch (error) {
        console.error('Error deleting reservation:', error);
    }
}


module.exports = {
    client,
    createTables,
    createCustomer,
    createRestaurant,
    fetchCustomers,
    fetchRestaurants,
    createReservation,
    destroyReservation
};
