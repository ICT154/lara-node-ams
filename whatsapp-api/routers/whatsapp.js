/*
Summary:
This code defines routes for a WhatsApp API in an Express application. It loads a controller and uses it to handle requests for sending messages. It also includes a default route that returns a JSON response indicating that the API is working.

*/

// create routes
const express = require('express');
const router = express.Router();

// load controller
const whatsappController = require('../controllers/whatsappcontroller');

// use controller
router.get('/whatsappapi', whatsappController.sendMassage);
router.post('/kirimpesan', whatsappController.kirimpesan);
// router.get('/whatsappapi', whatsappController.index);

router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

module.exports = router;