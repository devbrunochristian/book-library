import mongoose, { Schema, Document } from "mongoose";

export interface BookInterface extends Document {
    title: string;
    category: string;
    author: string;
    img: string | null;

}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    img:
    {
        data: Buffer,
        contentType: String,

    }


});

const Book = mongoose.model<BookInterface>("Book", BookSchema);
export default Book;