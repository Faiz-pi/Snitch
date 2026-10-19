import {body,validationResult} from "express-validator";

export const registerValidator = [
    body('email')
        .exists().withMessage("Email is required").bail()
        .isEmail().withMessage("Enter valid email address")
        .trim(),
    body("name")
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a String")
        .isLength({min: 2, max: 50}).withMessage("Name length must be between 2 to 50 characters")
        .trim(),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a String")
        .trim()
        .isLength({min: 6}).withMessage("Password must be minimum 6 character long"),
    (req,res, next) =>{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }

        next()
    }
]

export const loginValidator = [
    body("email")
        .exists().withMessage("Email is required").bail()
        .isString().withMessage("Email must be a String Value").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a String Value").bail()
        .trim()
        .isLength({min :6}).withMessage("Password must be 6 characters long").bail(),
    (req, res, next) =>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message:"Invalid data",
                errors: errors.array()
            })
        }

        next()
    }
]