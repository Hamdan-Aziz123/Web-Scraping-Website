const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db"); // Import the db connection
const sendMail = require("../Services/MailService");
const { generateTokens } = require("../middleware/authMiddleware");
const { verifyGoogleToken } = require("../middleware/authMiddleware");

// Signup Function
const signup = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, password } = req.body;
    const role = "user"; // Default role

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    pool.getConnection((err, conn) => {
      if (err) {
        console.error("Error opening the connection!");
        return res.status(500).send({
          error: "Database connection failed",
        });
      }

      // console.log("Connection established successfully! in signup in server");

      const query = `INSERT INTO users (Email, FirstName, LastName, PhoneNumber, Role, PasswordHash) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

      conn.query(
        query,
        [email, firstName, lastName, phone, role, hashedPassword],
        (err, results) => {
          conn.release(); // Release connection back to the pool
          if (err) {
            console.error("Error executing query! in signup in server", err);
            return res
              .status(400)
              .send({ error: "User Already Exists or Signup Failed" });
          }

          // console.log("Query executed successfully! in signup in server");

          // Generate tokens
          const payload = { id: results.insertId, role };
          const { accessToken, refreshToken } = generateTokens(payload);

          res.status(200).send({
            message: "Signup successful!",
            user: { email, firstName, lastName, phone, role },
            accessToken,
            refreshToken,
          });
        }
      );
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal Server Error in SignUp",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    // console.log("Google Login Request:", req.body);
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).send({ error: "Google token is required" });
    }

    const user = await verifyGoogleToken(credential);
    // console.log("Verified as Google Token:", user);

    // Check if user exists in the database
    pool.getConnection((err, conn) => {
      if (err) {
        console.error("Error opening the connection!");
        return res.status(500).send({ error: "Database connection failed" });
      }

      // console.log(
      //   "Connection established successfully! in google login in server"
      // );

      const query = `SELECT * FROM users WHERE Email=?`;
      conn.query(query, [user.email], async (err, results) => {
        conn.release(); // Release connection back to the pool
        if (err) {
          console.error(
            "Error executing query! in google login in server",
            err
          );
          return res.status(400).send({ error: "Google Login Failed" });
        }

        if (results.length === 0) {
          // User does not exist, create a new user

          try {
            const role = "user"; // Default role
            const query = `INSERT INTO users (Email, FirstName, LastName, Role, GoogleId ) VALUES (?, ?, ?, ?,?)`;
            conn.query(
              query,
              [user.email, user.given_name, user.family_name, role, user.sub],
              (err, results) => {
                if (err) {
                  console.error(
                    "Error executing query! in google login in server",
                    err
                  );
                  return res.status(400).send({ error: "Google Login Failed" });
                }

                const payload = { id: results.insertId, role };
                const { accessToken, refreshToken } = generateTokens(payload);

                // console.log("User logged in successfully!");

                res.status(200).send({
                  message: "Login successful!",
                  user: {
                    email: user.email,
                    firstName: user.given_name,
                    lastName: user.family_name,
                    role,
                  },
                  accessToken,
                  refreshToken,
                });
              }
            );
          } catch (err) {
            console.error(
              "Error executing query! in google login in server",
              err
            );
            return res.status(400).send({ error: "Google Login Failed" });
          }
        } else {

          if (!results[0].GoogleId) {
            return res.status(400).send({ error: "Google Login Failed" });
          }

          if (results[0].GoogleId !== user.sub) {
            return res.status(400).send({ error: "Google Login Failed" });
          }
          
          const payload = { id: results[0].UserId, role: results[0].Role };
          const { accessToken, refreshToken } = generateTokens(payload);

          // console.log("User logged in successfully!");

          res.status(200).send({
            message: "Login successful!",
            user: {
              email: results[0].Email,
              firstName: results[0].FirstName,
              lastName: results[0].LastName,
              role: results[0].Role,
            },
            accessToken,
            refreshToken,
          });
        }
      });
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal Server Error in Google Login",
    });
  }
};

// Login Function
const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and Password are required" });
    }

    pool.getConnection((err, conn) => {
      if (err) {
        console.error("Error opening the connection!");
        return res.status(500).send({ error: "Database connection failed" });
      }

      console.log("Connection established successfully! in login in server");

      const query = `SELECT * FROM users WHERE Email=?`;
      conn.query(query, [email], async (err, results) => {
        conn.release(); // Release connection back to the pool
        if (err || results.length === 0) {
          console.error("Error executing query! in login in server", err);
          return res.status(404).send({ error: "Email or Password Incorrect" });
        }

        const user = results[0];

        // Verify the password
        const isPasswordValid = await bcrypt.compare(
          password,
          user.PasswordHash
        );
        if (!isPasswordValid) {
          return res.status(400).send({ error: "Email or Password Incorrect" });
        }

        // Generate tokens
        const payload = { id: user.UserId, role: user.Role };
        const { accessToken, refreshToken } = generateTokens(payload);

        console.log("User logged in successfully!");
        res.status(200).send({
          message: "Login successful!",
          user: {
            email: user.Email,
            firstName: user.FirstName,
            lastName: user.LastName,
            role: user.Role,
          },
          accessToken,
          refreshToken,
        });
      });
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal Server Error in Login",
    });
  }
};



// const forgetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Establish database connection
//     pool.getConnection((err, conn) => {
//       if (err) {
//         // console.log("Error opening the connection!");
//         return res.status(500).send("Internal server error.");
//       }
//       // console.log("Connection established successfully!");

//       // Query the database to check if the email exists
//       const query = `SELECT * FROM users WHERE Email='${email}'`;
//       conn.query(query, (err, results) => {
//         if (err) {
//           // console.log("Error executing query!");
//           return res.status(500).send("Error querying the database.");
//         }

//         // Check if the email exists in the database
//         if (results.length === 0) {
//           // console.log("Account not found for the provided email.");
//           return res
//             .status(404)
//             .send("Account does not exist. Please create a new account.");
//         }

//         // Generate a 6-digit code
//         const code = Math.floor(100000 + Math.random() * 900000);
//         const emailContent = `
//                     <div>
//                         <h1>Reset Password</h1>
//                         <p>Enter the code below to reset your password</p>
//                         <p>Code: ${code}</p>
//                     </div>
//                 `;

//         // Send the email with the code
//         sendMail(email, "Password Reset Code", emailContent);
//         // console.log("Code sent:", code);

//         // Respond with the code (in production, you wouldn't send the code back in the response)
//         res.status(200).send({ code });
//       });
//     });
//   } catch (err) {
//     console.error("Error in forgetPassword:", err);
//     res.status(500).send("Verification code sending failed.");
//   }
// };


const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Establish database connection
    pool.getConnection(async (err, conn) => {
      if (err) {
        return res.status(500).send("Internal server error.");
      }

      try {
        // Query the database using parameterized queries to prevent SQL injection
        const query = `SELECT * FROM users WHERE Email = ?`;
        conn.query(query, [email], async (err, results) => {
          conn.release(); // Release the connection after query execution

          if (err) {
            return res.status(500).send("Error querying the database.");
          }

          // Check if the email exists in the database
          if (results.length === 0) {
            return res
              .status(404)
              .send("Account does not exist. Please create a new account.");
          }

          // Generate a 6-digit code
          const code = Math.floor(100000 + Math.random() * 900000);
          const emailContent = `
            <div>
              <h1>Reset Password</h1>
              <p>Enter the code below to reset your password</p>
              <p>Code: <strong>${code}</strong></p>
            </div>
          `;

          // Send the email and wait for the response
          const sendEmailResult = await sendMail(email, "Password Reset Code", emailContent);

          // Check if the email was sent successfully
          if (!sendEmailResult.success) {
            return res.status(500).send("Error sending verification email.");
          }

          // Respond with the code (in production, avoid sending the actual code in the response)
          return res.status(200).send({ code });
        });
      } catch (error) {
        conn.release(); // Release the connection in case of error
        console.error("Error in forgetPassword:", error);
        res.status(500).send("Verification code sending failed.");
      }
    });
  } catch (err) {
    console.error("Error in forgetPassword:", err);
    res.status(500).send("Verification code sending failed.");
  }
};

const resetPassword = async (req, res) => {
  try {
    pool.getConnection((err, conn) => {
      if (err) {
        // console.log("Error opening the connection!");
        return;
      }
      // console.log(
      //   "Connection established successfully! in resetPassword in server"
      // );
      const { email, password } = req.body;
      // console.log(
      //   "email and password in resetPassword in server",
      //   email,
      //   password
      // );
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const query = `UPDATE users SET PasswordHash='${hashedPassword}' WHERE Email='${email}' and GoogleId is NULL`; // AND password='${password}'
      conn.query(query, function (err, results) {
        if (err) {
          // console.log("Error executing query! in resetPassword in server ");
          return;
        }
        // console.log("Query executed successfully! in resetPassword in server");
        res.status(200).send("Password Reset Successfully");
      });
    });
  } catch (err) {
    res.status(400).send("Password Reset Failed");
  }
};

// Refresh Token Function

module.exports = {
  signup,
  login,
  googleLogin,
  forgetPassword,
  resetPassword,
};
