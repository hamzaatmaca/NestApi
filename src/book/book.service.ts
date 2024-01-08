import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookModel.find();
      return books;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Book not found');
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const res = await this.bookModel.create(book);
      return res;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Book not create');
    }
  }

  async findById(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id);

      return book;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Book not found');
    }
  }

  async updateById(id: string, book: Book): Promise<Book> {
    try {
      const res = await this.bookModel.findByIdAndUpdate(id, book, {
        new: true,
        runValidators: true,
      });

      return res;
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Book not found');
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      return await this.bookModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException('Book not found');
    }
  }
}
