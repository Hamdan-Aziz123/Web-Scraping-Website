const pool = require("../config/db");

// NOTE: every query here uses pool.query(), which borrows a connection from the
// pool and gives it back automatically when the query finishes (success or error).
// The old code used pool.getConnection() and often never released the connection,
// so after ~10 requests the pool ran out and every request hung forever.
// All queries use "?" placeholders so names with quotes/apostrophes work safely.

const addProduct = async (req, res) => {
    const { title, price, category, description, Quantity, image } = req.body;
    if (!title || !price || !category || !description || !image) {
        return res.status(400).send('All fields are required in addProduct in server.js');
    }
    const query = `INSERT INTO products (Name, Description, PricePerKg, QuantityInStock, Category, ImageUrl)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(query, [title, description, price, Quantity || 0, category, image], (err) => {
        if (err) {
            console.error("Error adding product:", err.message);
            return res.status(500).send('Error adding Product in addProduct in server.js');
        }
        res.status(200).send('Product added successfully in addProduct in server.js');
    });
};

const ProductsFetch = async (req, res) => {
    pool.query(`SELECT * FROM products ORDER BY ProductId ASC`, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err.message);
            return res.status(500).send('Error fetching Products in Product fetching in server.js');
        }
        res.status(200).send(results);
    });
};

const deleteproduct = async (req, res) => {
    const { Title } = req.body;
    if (!Title) {
        return res.status(400).send('Product title is required in delete function of products in server.js');
    }
    pool.query(`DELETE FROM products WHERE Name = ?`, [Title], (err) => {
        if (err) {
            console.error("Error deleting product:", err.message);
            return res.status(500).send('Error deleting product in delete function of products in server.js');
        }
        res.status(200).send('Product deleted from products table successfully in delete function of products in server.js');
    });
};

const EditedProductFetch = async (req, res) => {
    const { productName } = req.params;
    pool.query(`SELECT * FROM products WHERE Name = ?`, [productName], (err, results) => {
        if (err) {
            console.error("Error fetching product for edit:", err.message);
            return res.status(500).send('Error fetching data');
        }
        res.status(200).send(results);
    });
};

const updateProduct = async (req, res) => {
    const { formData, oldProductName } = req.body;
    if (!formData || !oldProductName) {
        return res.status(400).send('Product details are required.');
    }
    // ImageUrl: a new link replaces the image; if none is sent, the current image is kept.
    const query = `
        UPDATE products
        SET Name = ?, Category = ?, PricePerKg = ?, Description = ?, QuantityInStock = ?,
            ImageUrl = COALESCE(NULLIF(?, ''), ImageUrl)
        WHERE Name = ?`;
    const values = [
        formData.Name,
        formData.Category,
        formData.PricePerKg,
        formData.Description,
        formData.QuantityInStock,
        formData.ImageUrl || null,
        oldProductName
    ];
    pool.query(query, values, (err, results) => {
        if (err) {
            console.error("Error executing query in updateProduct:", err.message);
            return res.status(500).send('Error updating the product. Please try again later.');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No product found with the specified name.');
        }
        res.status(200).send('Product updated successfully.');
    });
};

const OrdersFetch = async (req, res) => {
    pool.query(`SELECT * FROM orders ORDER BY OrderDate DESC`, (err, results) => {
        if (err) {
            console.error("Error fetching orders:", err.message);
            return res.status(500).send('Error fetching orders in OrdersFetch in server.js');
        }
        res.status(200).send(results);
    });
};

const usersFetch = async (req, res) => {
    pool.query(`SELECT * FROM users`, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err.message);
            return res.status(500).send('Error fetching orders in usersFetch in server.js');
        }
        res.status(200).send(results);
    });
};

const MsgsFetch = async (req, res) => {
    const query = `SELECT fullname, phone_number, email, message, submitted_at FROM contactus ORDER BY submitted_at DESC`;
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching messages:", err.message);
            return res.status(500).send('Error fetching messages in MsgsFetch in server.js');
        }
        res.status(200).send(results);
    });
};

// Items of one order
const orderDetailsFetchAdmin = async (req, res) => {
    const { Oid } = req.params;
    if (!Oid) {
        return res.status(400).send('Order ID is required in orderDetailsFetchAdmin in server.js');
    }
    pool.query(`SELECT * FROM orderitems WHERE OrderID = ?`, [Oid], (err, results) => {
        if (err) {
            console.error("Error fetching order items:", err.message);
            return res.status(500).send('Error fetching order details in orderDetailsFetchAdmin in server.js');
        }
        res.status(200).send(results);
    });
};

// The order itself (customer, address, payment...)
const orderItemsFetchAdmin = async (req, res) => {
    const { Oid } = req.params;
    if (!Oid) {
        return res.status(400).send('Order ID is required in orderItemsFetchAdmin in server.js');
    }
    pool.query(`SELECT * FROM orders WHERE OrderID = ?`, [Oid], (err, results) => {
        if (err) {
            console.error("Error fetching order:", err.message);
            return res.status(500).send('Error fetching order items in orderItemsFetchAdmin in server.js');
        }
        if (results.length === 0) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send(results[0]);
    });
};

module.exports = {
    OrdersFetch,
    addProduct,
    updateProduct,
    deleteproduct,
    EditedProductFetch,
    MsgsFetch,
    usersFetch,
    ProductsFetch,
    orderDetailsFetchAdmin,
    orderItemsFetchAdmin
}
