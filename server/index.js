const express = require('express');
const bodyParser = require('body-parser');
const {createTables, createCustomer, createRestaurant, fetchCustomers, fetchRestaurants, createReservation, destroyReseration} = require('./db');

const app = express();
app.use(bodyParser.json());

createTables();

app.get('/api/customers', async(req, res) => {
    const customers = await fetchCustomers();
    res.json(customers);
});


app.get('/api/restaurants', async (req, res) => {
    const restaurants = await fetchRestaurants();
    res.json(restaurants);
  });
  
  app.get('/api/reservations', async (req, res) => {
    // Implement logic to fetch reservations from the database
  });
  
  app.post('/api/customers/:id/reservations', async (req, res) => {
    const { restaurant_id, date, party_count } = req.body;
    const { id } = req.params;
    // Implement logic to create a reservation in the database for the specified customer
  });
  
  app.delete('/api/customers/:customer_id/reservations/:id', async (req, res) => {
    const { id, customer_id } = req.params;
    // Implement logic to delete a reservation from the database
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

const init = async()=> {
    console.log('connecting to database');
    await client.connect();
    console.log('connected to database');
};

init();