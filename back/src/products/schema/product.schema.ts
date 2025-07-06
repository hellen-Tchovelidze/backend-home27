import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
enum Role {
    "ADMIN"="admin",
    "USER"= "user",
    "EDITOR"= "editor",
}

@Schema({timestamps: true})
export class Product {
    @Prop({
        type: String,
        required: true
    })
    name: string

    @Prop({
        enum: Role,
        required: true,
        default: Role.USER
    })
    role: Role

    @Prop({
        type: String,
        required: true
    })
    desc: string

    @Prop({
        type: Boolean,
    })
    isGuarantee: boolean

    @Prop({
        type: String,
        required: true
    })
    category: string

    @Prop({
        type: Number,
        required: true,
        index: true
    })
    price: number

    @Prop({
        type: String,
        required: true
    })
    imgUrl: string

    @Prop({
        type: Number,
        required: true
    })
    quantity: number
}

export const productSchema = SchemaFactory.createForClass(Product)
