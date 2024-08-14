import { IntegerType } from "mongodb";
import { Schema, models, model } from "mongoose";
import { product } from "./product";

export interface qr {
    qrlink: string,
    isOwned: boolean,
    isSet: boolean,
    link: string,
    product: product,
    impressions: Number,
    impressionsToday: Number,
}

const QrSchema = new Schema<qr>({
    qrlink: {
        type: String,
        required: true
    },
    isOwned: {
        type: Boolean,
        required: true,
        default: false,
    },
    isSet: {
        type: Boolean,
        required: true,
        default: false,
    },
    link: {
        type: String,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    impressions: {
        type: Number,
        required: true,
        default: 0
    },
    impressionsToday: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: true })

const qrModel = models.qrs || model<qr>('qrs', QrSchema);

export default qrModel;