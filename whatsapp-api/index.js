/**
 * This code sets up an Express server that listens on port 3000.
 * It loads the routes from the whatsapp.js file and uses them for the '/api' endpoint.
 * The root endpoint returns a 'Hello World!' response.
 */

const express = require('express');
const app = express();
const port = 3000;

// Load routes
const whatsappRouter = require('./routers/whatsapp');

// Use routes
app.use('/api', whatsappRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});