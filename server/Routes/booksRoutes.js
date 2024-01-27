import express from "express";

import { BooK } from "../Models/Book.js";

const router = express.Router();


//retrieving all books from the collection
router.get('/', async (req,res)=>{
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
router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const book = await BooK.findById(id)
        
        res.status(200).json({book})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"internal server error: failed get request"})
    }
})

router.post('/', async (req, res) => {
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
            Description: req.body.Description,
            coverUrl: req.body.coverUrl
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
router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
  
  export default router 

