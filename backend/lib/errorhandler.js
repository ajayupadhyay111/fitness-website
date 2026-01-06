export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = "Internal Server Error";

  // Mongoose / MongoDB Errors

  // Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for ${field}`;
  }

  // Validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // JWT Errors

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Default Response

  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
  });
};

// ---------------✅ errorHandler kab trigger hota hai -----

// Case 1: Tum throw karte ho
// throw new Error("Something went wrong");

// ➡ Express internally next(err) call karta hai
// ➡ errorHandler run hota hai

// Case 2: Tum next(err) call karte ho
// return next(new Error("User not found"));

// ➡ Direct errorHandler me jump

// Case 3: Async error (sabse common)
// const user = await User.findById(id); // ❌ DB error

// Async errors automatically catch nahi hote, isliye:

// catch(err) {
//   next(err);
// }

// Ya phir:

// asyncHandler(fn)

// ❌ Kab errorHandler nahi chalega
// app.get("/", (req, res) => {
//   throw new Error("Boom");
// });

// ❌ Ye Express crash karega (async context)

// ✔️ Isliye asyncHandler zaroori hai.
