/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import Book from '../Models/bookModel';
import path from 'path';
import fs from 'fs'



export default abstract class BookService {
    static getBooks = async (req: Request, res: Response) => {
        try {
            const books = await Book.find()
            res.status(200).json({ books })
        } catch (error) {
            res.status(500).json({ error })

        }
    }

    static getBook = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const book = await Book.find({ _id: id })
            res.status(200).json({ book })
        } catch (error) {
            res.status(500).json({ error })

        }
    }


    static createBook = async (req: Request, res: Response) => {
        const { title, author, category } = req.body
        const file = req.file

        if (!file) {
            return res.status(404).json({ error: 'File not found' })
        }

        if (!title) {
            return res.status(400).json({ error: 'Title is required!' })

        }

        if (!author) {
            return res.status(400).json({ error: 'Author is required!' })

        }

        if (!category) {
            return res.status(400).json({ error: 'Category is required!' })

        }

        try {

            const book = new Book({
                title,
                author,
                category,
                img: {
                    data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
                    contentType: req.file.mimetype
                }
            })

            await book.save()
            res.status(201).json({ book })

        } catch (error) {
            res.status(500).json({ error })

        }
    }
    static deleteBook = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const response = await Book.findByIdAndDelete({ _id: id })

            if (!response) {
                return res.status(400).json({ error: 'Book not found!' })

            }
            res.status(200).json({ response })
        } catch (error) {
            res.status(500).json({ error })

        }
    }
    static updateBook = async (
        req: Request,
        res: Response,
    ) => {
        const { id } = req.params
        const { title, category, author } = req.body
        const updatedBook = {
            title,
            category,
            author
        }
        try {
            const book = await Book.findByIdAndUpdate({ _id: id }, updatedBook, {
                new: true
            })
            if (!book) {
                return res.status(400).json({ error: 'Book not found!' });
            }
            return res.status(200).json({ book });
        } catch (error) {
            return res.status(500).json({ error });
        }
    };

}
