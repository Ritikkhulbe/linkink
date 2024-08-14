import {Schema, model, models} from "mongoose"

export interface product{
    name: string,
    size: string,
    images: string[],
    variant: string,
    productLink: string,
}

const ProductSchema = new Schema<product>({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    variant: {
        type: String,
        required: true,
    },
    productLink: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Product = models.products || model<product>("products", ProductSchema);

export default Product;