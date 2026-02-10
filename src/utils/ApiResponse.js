class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    // The actual data we want to send back to the client (user info, video info, etc.)
    this.success = statusCode < 400;
    // Automatically set success = true if status code is less than 400
  }
}

export default ApiResponse;

//same working as ApiError
