import { Schema } from 'mongoose';
import Product from '../../Domain/Entities/Product';
import { v4 as uuidv4 } from 'uuid';

const ProductSchema: any = new Schema<Product>({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    category:{ type: String, required: true },
    amount:{ type: Number, required: true  },
    color:{ type: String, required: true },
    createdBy: { type: Schema.Types.String, ref: 'User' },
    lastModifiedBy: { type: Schema.Types.String, ref: 'User' }
}, { timestamps: true });

ProductSchema.loadClass(Product);

export default ProductSchema;
