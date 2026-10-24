import { Router } from "express";
import { createProductValidator } from "../validator/product.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";
import multer from "multer";

// Configure file uploads for product images.
// multer.memoryStorage() keeps the uploaded file data in memory so it can be processed
// before saving or forwarding to the controller.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024,
  },
});

// Create a router for product-related routes.
const router = Router();

// POST /products
// This route handles creating a new product.
router.post(
  "/",
  // First, make sure the user is authenticated.
  authenticate,

  // Only sellers are allowed to create products.
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "User is not authorize to create products" });
    }
    next();
  },

  // Accept up to 5 image files under the "images" field in the request.
  upload.array("images"),

  // The frontend may send price/sizes as JSON strings in multipart form data.
  // We parse them back into actual arrays/objects before validation and controller logic.
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JOSN.parse(req.body.sizes));
    next();
  },

  // Validate the product payload before processing it.
  createProductValidator,

  // Final controller that saves the product to the database.
  createProduct,
);

export default router;
