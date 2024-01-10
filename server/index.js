import mongoose from 'mongoose';
import { PORT, MongodbUrl } from './config.js';
import express from "express"
import booksRoutes from "./Routes/booksRoutes.js"
const app = express();
app.use(express.json())

app.use("/books", booksRoutes)
mongoose.connect(MongodbUrl).then(() => {
    console.log("u are connected to the database")
}).catch((error) => {
    console.log(error.message)
})

app.listen(PORT, console.log(`server running at ${PORT}`))