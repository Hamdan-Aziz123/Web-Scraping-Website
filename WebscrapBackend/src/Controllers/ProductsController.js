const pool = require("../config/db"); // Import the db connection

const getProducts = async (req, res) => {
    // console.log('products fetching');
    try {
        // Get a connection from the pool
        pool.getConnection((err, conn) => {
            // console.log('getProducts in server');
        if (err) {
            // console.log("Error opening the connection!");
            return res.status(500).send("Database connection failed");
        }
        
        // console.log("Connection established successfully! in getProducts in server");
    
        const query = `SELECT * FROM products`;
        // Use parameterized query to avoid SQL injection
        conn.query(query, (err, results) => {
            conn.release(); // Release connection back to the pool
            if (err) {
            // console.log("Error executing query! in getProducts in server");
            return res.status(400).send("Products not found");
            }
            // console.log("Query executed successfully! in getProducts in server");
            res.status(200).send(results);
        });
        });
    } catch (err) {
        res.status(400).send("Products not found");
    }
};


const getUsedItems = async (req, res) => {
    // console.log('getUsedItems fetching');
    try {
        // Get a connection from the pool
        pool.getConnection((err, conn) => {
            // console.log('getUsedItems in server');
        if (err) {
            // console.log("Error opening the connection!");
            return res.status(500).send("Database connection failed");
        }
        
        // console.log("Connection established successfully! in getProducts in server");
    
        const query = `SELECT * FROM products where Category = 'Used Scrap'`;
        // Use parameterized query to avoid SQL injection
        conn.query(query, (err, results) => {
            conn.release(); // Release connection back to the pool
            if (err) {
            // console.log("Error executing query! in getProducts in server");
            return res.status(400).send("UsedProducts not found");
            }
            // console.log("Query executed successfully! in getUsedItems in server");
            res.status(200).send(results);
        });
        });
    } catch (err) {
        res.status(400).send("UsedProducts not found");
    }
};




const getProduct = async (req, res) => {
    // console.log('getProduct in server',req.params.ProductId);
    try {
        pool.getConnection((err, conn) => {
            if (err) {
                // console.log("Error opening the connection!");
                return res.status(500).send("Database connection failed");
            }
            // console.log("Connection established successfully!");
            const query = `SELECT * FROM products WHERE ProductID = ?`;
            conn.query(query, [req.params.ProductId], (err, results) => {
                conn.release();
                if (err) {
                    // console.log("Error executing query!");
                    return res.status(400).send("Product not found");
                }
                // console.log("Query executed successfully!");
                res.status(200).send(results[0]);
            });
        });
    } catch (err) {
        res.status(400).send("Product not found");
    }
}
    

module.exports={
    getProducts,
    getProduct,
    getUsedItems
} 
