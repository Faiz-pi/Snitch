import mongoose from "mongoose";


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



const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    description:{
        type: String,
        required: true,
        minLength: 20,
        maxLength: 500
    },
    images:{
        type: [{type: String}],
        validate: {
            validator: images => images.length <= 5,
            message: "A product can have at most 5 images"
        }
    },
    price:{
        amount:{
            type: Number,
            required: true
        },
        currency:{
            type: String,
            enum:["INR","USD"],
            default: "INR"
        }
    },
    sizes:[{
        size:{
            type: String,
            enum: ["XS","S","M","L","XL","XXL"],
            required: true
        },
        stock:{
            type: Number,
            min: 0,
            default: 0
        }
    }],
    seller:{
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    }
})