const pool = require("../config/db"); 


const saveMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validate input fields
    if (!name || !email || !phone || !message) {
        return res.status(400).send('All fields are required in saveContactMessage in server.js');
    }

    try {
        pool.getConnection((err, conn) => {
            if (err) {
                // console.log("Error opening the connection! in saveContactMessage in server.js");
                return res.status(500).send('Database connection error in saveContactMessage in server.js');
            }

            // Insert query to save the contact message
            const query = `INSERT INTO contactus (fullname, email, phone_number, message)
                           VALUES ('${name}', '${email}', '${phone}', '${message}')`;

            conn.query(query, function (err, results) {
                if (err) {
                    // console.log("Error executing query! in saveContactMessage in server.js");
                    return res.status(500).send('Error saving message in saveContactMessage in server.js');
                }
                // console.log("Query executed successfully! in saveContactMessage in server.js");
                res.status(200).send('Message saved successfully in saveContactMessage in server.js');
            });
        });
    } catch (err) {
        // console.log(err);
        res.status(400).send('Error saving message in saveContactMessage in server.js');
    }
};


module.exports = {
    saveMessage,
};