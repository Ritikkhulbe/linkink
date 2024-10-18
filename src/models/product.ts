import {Schema, model, models} from "mongoose"

export interface product{
    productNumber: Number,
    name: string,
    sizes: string[],
    images: string,
    colours: string,
    productLink: string,
}

const ProductSchema = new Schema<product>({
    productNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    sizes: {
        type: [String],
        required: true,
        default: [ "S", "M", "L", "XL", "XXL" ]
    },
    images: {
        type: String,
        required: [true, "Please provide at least one image"],
    },
    colours: {
        type: String,
        required: true,
        default: "Black",
    },
    productLink: {
        type: String,
    }
}, {timestamps: true});

const Product = models.products || model<product>("products", ProductSchema);

export default Product;