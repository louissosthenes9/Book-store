// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Book-store');

// Create a new document in the collection.
db.getCollection('Books').insertOne({
    
  "title": "Sample Book",
  "PublishYear": 2022,
  "Author": "John Doe",
  "Ratings": 4.5,
  "Price": 19.99,
  "Description": "A captivating book about something interesting."

});
