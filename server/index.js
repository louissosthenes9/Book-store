import mongoose from 'mongoose';
import { PORT, MongodbUrl } from './config.js';
import express from "express"
import { BooK } from './Models/Book.js';
const app = express();
app.use(express.json())

mongoose.connect(MongodbUrl).then(() => {
    console.log("u are connected to the database")
}).catch((error) => {
    console.log(error.message)
})

//retrieving all books from the collection
app.get('/books', async (req,res)=>{
    try {
        const books = await BooK.find()
        
        res.status(200).json({
            count:books.length,
            data:books
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:"internal server error: failed get request"})
    }
})

//retrieving a single book from this end point
app.get('/books/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const book = await BooK.findById(id)
        
        res.status(200).json({book})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"internal server error: failed get request"})
    }
})

app.post('/books', async (req, res) => {
    try {
        const requiredFields = ['title', 'Author', 'Price', 'Ratings', 'PublishYear', 'Description'];
        const missingFields = [];
      
        for (const field of requiredFields) {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            return res.status(400).send({
                message: `Bad request: Missing required fields - ${missingFields.join(', ')}`
            });
        }
        const newBook = {
            title: req.body.title,
            Author: req.body.Author,
            Price: req.body.Price,
            Ratings: req.body.Ratings,
            PublishYear: req.body.PublishYear,
            Description: req.body.Description
        }

       const book = await BooK.create(newBook)
       res.status(201).send({message:"u have successfully created a book"})

    } catch (err) {
        console.log(err.message)
        res.status(500).send(
            { message: err.message }
        )
    }
})

app.put('/books/:id', async (req, res) => {
    try {
      const requiredFields = ['title', 'Author', 'Price', 'Ratings', 'PublishYear', 'Description'];
      const missingFields = [];
  
      for (const field of requiredFields) {
        if (!req.body[field]) {
          missingFields.push(field);
        }
      }
  
      if (missingFields.length > 0) {
        return res.status(400).send({
          message: `Bad request: Missing required fields - ${missingFields.join(', ')}`
        });
      }
  
      const { id } = req.params;
      const result = await BooK.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.status(404).send({ message: 'Oops, book not found' });
      }
  
      res.status(200).send({ message: 'The book is successfully updated', booK: result });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error: Failed PUT request' });
    }
  });

  app.delete('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await BooK.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).send({ message: 'Book not found' });
      }
  
      res.status(200).send({ message: 'The book is successfully deleted' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Internal Server Error: Failed DELETE request' });
    }
  });
  
  
app.listen(PORT, console.log(`server running at ${PORT}`))

