//creating our own error type called ApiError(extending the builtin js error class)
class ApiError extends Error {
  //we can use ApiError(custom status code(like 400),"Custom error message")
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    //calling parent error class(builtin js error class)
    this.statusCode = statusCode; //Adding a custom HTTP status code to the error (JavaScript Error doesn't have one)
    this.data = null;
    this.message = message; //same
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

/*
constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
)

we can







*/
