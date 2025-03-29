const pool = require("../config/db");


const checkout = async (req, res) => {
    console.log("checkout",);

    const user=req.user;
    console.log(user)

    const {
        firstName,
        lastName,
        address,
        email,
        city,
        phone,
        instruction,
        paymentMethod,
        products
    } = req.body;

 // Validate required fields
    if (!user || !user.id || !Array.isArray(products) || products.length === 0) {
        return res.status(400).send("Invalid request data ");
    }


    console.log("checkout",firstName, lastName, address, email, city, phone, instruction, paymentMethod, products);
    try {
        pool.getConnection((err, conn) => {
            if (err) {
                console.error("Error opening the connection!");
                return res.status(500).send("Database connection failed");
            }

            console.log("Connection established successfully! in checkout in server");

            const orderQuery = `
                INSERT INTO orders 
                (UserId,FirstName, LastName, Address, Email, City, PhoneNumber, instruction, paymentMethod) 
                VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)
            `;

            conn.query(
                orderQuery,
                [user.id,firstName, lastName, address, email, city, phone, instruction, paymentMethod],
                (err, orderResults) => {
                    if (err) {
                        conn.release();
                        console.error("Error executing order query! in checkout in server", err);
                        return res.status(400).send("Order placement failed");
                    }

                    console.log("Order placed successfully! in checkout in server");
                    const orderId = orderResults.insertId;

                    // Prepare query to insert multiple products into OrderItems
                    const itemsQuery = `
                        INSERT INTO orderitems (OrderID, ProductName, Quantity) VALUES ?
                    `;

                    const itemsData = products.map(product => [orderId, product.name, product.quantity]);

                    conn.query(itemsQuery, [itemsData], (err, itemResults) => {
                        conn.release();
                        if (err) {
                            console.error("Error executing order items query! in checkout in server", err);
                            return res.status(400).send("Failed to store order items");
                        }

                        res.status(200).send({
                            message: "Order placed successfully",
                            orderId: orderId, // Send the newly created order ID
                        });
                    });
                }
            );
        });
    } catch (err) {
        console.error("Error in checkout:", err);
        res.status(500).send("Order placement failed");
    }
};


module.exports = {
    checkout
    // checkoutOrderDetails
};
