import { body, validationResult } from "express-validator";   



/**
 * product: {
 * title:"Dummy Title",
 * description: "Dummy Description",
 * images:["image1.com","image2.com"],
 * price:{amount:150,currency:"INR"},
 * sizes:[{size:"S",stock:20},{size:"M",stock:15}],
 * seller: seller_id
 * }
 * 
 */

export const createProductValidator =[
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min:2, max:100 }).withMessage("Title must be minimum 2 characters long").bail()
        .isAlpha("en-US", { ignore: " -" }).withMessage("Title can only have english small case and capital case letter"),
    body("description")
        .exists().withMessage("description is required").bail()
        .isString().withMessage("description must be a string").bail()
        .trim()
        .isLength({ min:2, max:200 }).withMessage("description must be minimum 2 characters long").bail(),
    body("price.amount")
        .exists().withMessage("Price is required").bail()
        .isFloat({ min:0 }).withMessage("Price amount must be a floating number greater than or equal to 0"),
    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be a string").bail()
        .isIn(["INR","USD"]).withMessage("Currency must be either INR or USD"),
    body("sizes")
        .exists().withMessage("Sizes is required").bail()
        .isArray({ min:1}).withMessage("Sizes must be an array with at least one size").bail(),
    body("sizes.*.size")
        .exists().withMessage("Sizes must be present in every entry of sizes array").bail()
        .isString().withMessage("size must be a string value")
        .trim()
        .isIn(["XS","S","M","L","XL","XXL"]).withMessage("Size must be one of XS, S, M, L, XL, XXL"),
    body("sizes.*.stock")
        .exists().withMessage("Stock is required").bail()
        .isInt({ min:0 }).withMessage("Stock must be an integer greater than or equal to 0").bail(),
    (req, res, next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            })
        }
        next()
    }
]