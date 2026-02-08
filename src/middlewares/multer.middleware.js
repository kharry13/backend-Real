import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //null means no error
  },
});

export const upload = multer({
  storage,
});

// now we can call upload function anywhere to store files in public/temp

// cb (callback): A function we must call when we're done

// cb(null, "./public/temp") says: "There is no error (null), and I want you to put the file in the ./public/temp folder."
