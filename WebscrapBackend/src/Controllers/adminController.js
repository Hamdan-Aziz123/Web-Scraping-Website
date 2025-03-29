const pool = require("../config/db"); 

const addProduct = async (req, res) => {
    const { title,price, category, description,Quantity,image } = req.body;
    // console.log('addProduct',title, price, category, description,Quantity,image);
    if (!title ||  !price || !category || !description || !image) {
        return res.status(400).send('All fields are required in addProduct in server.js');
    }
    try {
        pool.getConnection((err, conn)=>{
            if (err) {
                // console.log("Error opening the connection! in addProduct in server.js");
                return res.status(500).send('Database connection error in addProduct in server.js');
            }
            const query = `INSERT INTO  products (Name, Description, PricePerKg, QuantityInStock, Category, ImageUrl) 
                    VALUES ('${title}','${description}','${price}','${Quantity}', '${category}','${image}')`;
            conn.query(query, function(err, results) {
                if (err) {
                    // console.log("Error executing query! in addProduct in server.js");
                    return res.status(500).send('Error adding Product in addProduct in server.js');
                }
                // console.log("Query executed successfully! in addProduct in server.js");
                res.status(200).send('Product added successfully in addProduct in server.js');
            });
        });
    } catch (err) {
        // console.log(err);
        res.status(400).send('Error adding Product in addProduct in server.js');
    }
};

const ProductsFetch=async (req, res) => {
    try {
        pool.getConnection((err, conn) => {
            if (err) {
                // console.log("Error opening the connection! in ProductsFetch in server.js");
                return res.status(500).send('Database connection error in ProductsFetch in server.js');
            }
           
            const query = `SELECT * FROM products order by ProductId asc`;
            conn.query(query, function(err, results) {
                if (err) {
                    // console.log("Error executing query! in Product fetching in server.js");
                    return res.status(500).send('Error fetching Products in Product fetching in server.js');
                }
                // console.log("Query executed successfully! in fetching Products in Product fetching in server.js");
                res.status(200).send(results);
            });
        });
    } catch (err) {
        // console.log(err);
        res.status(400).send('Error fetching Products in Product fetching in server.js');
    }
};



const deleteproduct = async (req, res) => {
    const { Title } = req.body;
    // console.log('deleteProducttttttttttt', Title);
    if (!Title) {
        // console.log('!productTitle');
        return res.status(400).send('Product title is required in delete function of products in server.js');
    }

    try {
        pool.getConnection((err, conn) => {
            if (err) {
                // console.log("Error opening the connection! in delete function of products in server.js");
                return res.status(500).send('Database connection error in delete function of products in server.js');
            }
            const query = `DELETE FROM products WHERE Name = ?`; // Using parameterized query to prevent SQL injection
            conn.query(query, [Title], function (err, results) {
                conn.release(); // Release the connection back to the pool
                if (err) {
                    // console.log("Error executing query! in delete function of products in server.js", err);
                    return res.status(500).send('Error deleting product in delete function of products in server.js');
                }
                // console.log("Query executed successfully! in delete function of products in server.js");
                res.status(200).send('Product deleted from products table successfully in delete function of products in server.js');
            });
        });
    } catch (err) {
        // console.log(err);
        res.status(400).send('Error deleting product from products table in delete function of products in server.js');
    }
};


const EditedProductFetch=async (req, res) => {
    try{
        pool.getConnection((err, conn) => {
            if (err) {
            // console.log("Error opening the connection! in EditedProductFetch in server");
            return;
            }
            // console.log("Connection established successfully! in EditedProductFetch in server");
            const {productName} = req.params;
            const query = `SELECT * FROM products WHERE Name='${productName}'`;
            conn.query(query, function(err, results) {
                if (err) {
                    // console.log("Error executing query! in EditedProductFetch in server");
                    return;
                }
                // console.log("Query executed successfully! in EditedProductFetch in server");
                // console.log(results);
                res.status(200).send(results);
            });
        });
    }   catch(err){
            res.status(400).send('Error fetching data');
        }
};


const updateProduct = async (req, res) => {
    const { formData, oldProductName } = req.body; // Destructure the incoming data
    // console.log('Received data for update:', formData, 'Old Product Name:', oldProductName);

    try {
        // Use parameterized query for safety and proper handling
        const query = `
            UPDATE products 
            SET Name = ?, Category = ?, PricePerKg = ?, Description = ?, QuantityInStock = ?
            WHERE Name = ?`;
        const values = [
            formData.Name, 
            formData.Category, 
            formData.PricePerKg, 
            formData.Description, 
            formData.QuantityInStock, 
            oldProductName
        ];

        // Execute query
        pool.query(query, values, (err, results) => {
            if (err) {
                console.error("Error executing query in updateProduct:", err);
                return res.status(500).send('Error updating the product. Please try again later.');
            }

            // Check if any rows were affected
            if (results.affectedRows === 0) {
                // console.log("No rows updated. The product name might not exist.");
                return res.status(404).send('No product found with the specified name.');
            }

            // console.log("Product updated successfully.");
            res.status(200).send('Product updated successfully.');
        });
    } catch (err) {
        console.error("Unexpected error in updateProduct:", err);
        res.status(500).send('An unexpected error occurred. Please try again later.');
    }
};




const OrdersFetch =async(req,res)=>{
    try{
        pool.getConnection((err,conn)=>{
            if(err){
                // console.log("Error opening the connection! in OrdersFetch in server.js");
                return res.status(500).send('Database connection error in OrdersFetch in server.js');
            }
            const query = `SELECT * FROM orders order by OrderDate desc`;
            conn.query(query,function(err,results){
                if(err){
                    // console.log("Error executing query! in OrdersFetch in server.js");
                    return res.status(500).send('Error fetching orders in OrdersFetch in server.js');
                }
                // console.log("Query executed successfully! in OrdersFetch in server.js");
                res.status(200).send(results);
            });
        });
    }
    catch(err){
        // console.log(err);
        res.status(400).send('Error fetching orders in OrdersFetch in server.js');
    }
};


const usersFetch =async(req,res)=>{
    
    try{
        pool.getConnection((err,conn)=>{
            if(err){
                // console.log("Error opening the connection! in usersFetch in server.js");
                return res.status(500).send('Database connection error in usersFetch in server.js');
            }
            const query = `SELECT * FROM users`;
            conn.query(query,function(err,results){
                if(err){
                    // console.log("Error executing query! in usersFetch in server.js");
                    return res.status(500).send('Error fetching orders in usersFetch in server.js');
                }
                // console.log("Query executed successfully! in usersFetch in server.js");
                res.status(200).send(results);
            });
        });
    }
    catch(err){
        // console.log(err);
        res.status(400).send('Error fetching orders in OrdersFetch in server.js');
    }
};

  

const MsgsFetch = async (req, res) => {
    try {
        pool.getConnection((err, conn) => {
            if (err) {
                // console.log("Error opening the connection! in MsgsFetch in server.js");
                return res.status(500).send('Database connection error in MsgsFetch in server.js');
            }
            const query = `SELECT fullname, phone_number, email, message, submitted_at FROM contactus ORDER BY submitted_at DESC`;
            conn.query(query, function (err, results) {
                if (err) {
                    // console.log("Error executing query! in MsgsFetch in server.js");
                    return res.status(500).send('Error fetching messages in MsgsFetch in server.js');
                }
                // console.log("Query executed successfully! in MsgsFetch in server.js");
                res.status(200).send(results);
            });
            conn.release(); // Release the connection back to the pool
        });
    } catch (err) {
        // console.log(err);
        res.status(400).send('Error fetching messages in MsgsFetch in server.js');
    }
};



const orderDetailsFetchAdmin = async (req, res) => {
    const { Oid } = req.params;
    // console.log('orderDetailsFetchAdmin',Oid);
    if (!Oid) {
        return res.status(400).send('Order ID is required in orderDetailsFetchAdmin in server.js');
    }
    try {
        pool.getConnection((err, conn) => {
            if (err) {
                // console.log("Error opening the connection! in orderDetailsFetchAdmin in server.js");
                return res.status(500).send('Database connection error in orderDetailsFetchAdmin in server.js');
            }
            const query = `SELECT * FROM orderitems WHERE OrderID='${Oid}'`;
            conn.query(query, function(err, results) {
                if (err) {
                    // console.log("Error executing query! in orderDetailsFetchAdmin in server.js");
                    return res.status(500).send('Error fetching order details in orderDetailsFetchAdmin in server.js');
                }
                // console.log("Query executed successfully! in orderDetailsFetchAdmin in server.js");
                res.status(200).send(results);
            });
        });
    } catch (err) {
        // console.log(err);
        res.status(400).send('Error fetching order details in orderDetailsFetchAdmin in server.js');
    }
};

// Endpoint to fetch order details
const orderItemsFetchAdmin = async (req, res) => {
    const { Oid } = req.params;
    // console.log('orderItemsFetchAdmin',Oid);
    if (!Oid) {
        return res.status(400).send('Order ID is required in orderItemsFetchAdmin in server.js');
    }
    try {
        pool.getConnection((err, conn) => {
            if (err) {
                // console.log("Error opening the connection! in orderItemsFetchAdmin in server.js");
                return res.status(500).send('Database connection error in orderItemsFetchAdmin in server.js');
            }
            const query = `SELECT * FROM orders WHERE OrderID='${Oid}'`;
            conn.query(query, function(err, results) {
                if (err) {
                    // console.log("Error executing query! in orderItemsFetchAdmin in server.js");
                    return res.status(500).send('Error fetching order items in orderItemsFetchAdmin in server.js');
                }
                // console.log("Query executed successfully! in orderItemsFetchAdmin in server.js");
                res.status(200).send(results[0]);
            });
        });
    } catch (err) {
        // console.log(err);
        res.status(400).send('Error fetching order items in orderItemsFetchAdmin in server.js');
    }
    
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
