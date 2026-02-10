/*
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
*/

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;

/*
asyncHandler is a Higher-Order Function. 
It takes another function (requestHandler) as an argument. 
RequestHandler is our actual code that is wrapped in a safety layer
It's like a wrapper that you put around your normal route logic.  

.then() can only be used if you already have a Promise.
But what if requestHandler is NOT async?
(Only async functions return a promise)
.resolve() guarantees:
async function → stays a Promise
normal function → becomes a resolved Promise
So .catch() always works.

.then() assumes you already have a Promise.
Promise.resolve() ensures you ALWAYS have one.
*/
