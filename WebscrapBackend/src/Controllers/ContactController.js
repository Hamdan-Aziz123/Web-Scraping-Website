const pool = require("../config/db"); 


const saveMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validate input fields
    if (!name || !email || !phone || !message) {
        return res.status(400).send('All fields are required in saveContactMessage in server.js');
    }

    // "?" placeholders: messages with apostrophes/quotes (e.g. "I'd like to sell") save correctly,
    // and pool.query releases the connection automatically.
    const query = `INSERT INTO contactus (fullname, email, phone_number, message)
                   VALUES (?, ?, ?, ?)`;

    pool.query(query, [name, email, phone, message], (err) => {
        if (err) {
            console.error("Error saving contact message:", err.message);
            return res.status(500).send('Error saving message in saveContactMessage in server.js');
        }
        res.status(200).send('Message saved successfully in saveContactMessage in server.js');
    });
};


module.exports = {
    saveMessage,
};
