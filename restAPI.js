require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 3000;
app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  }catch(e) {
    console.log(e);
  }
});
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Successfully, Connected to Cluster");
  })
  .catch((error) => {
    console.error("Error in Connecting to MongoDB:", error);
  });
// mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error in Connecting to MongoDB:", error);
//   });
app.use(express.json());

const Book = mongoose.model('Book', {
    title: String,
    author: String,
    summary: String,
});

app.get('/', (req, res) => {
  res.send("Hi welcome to BookStore")
});

app.post('/api/books', async (req, res) => {
  try {
    const { title, author, summary } = req.body;
    const book = new Book({ title, author, summary });
    await book.save();
    res.status(201).json(book);
  } catch (e) {
    res.status(400).json({ Error: e.message });
  }
});

app.get('/api/books', async(req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  }catch(e) {
    res.status(400).send(e.message);
  }
  });

app.get('/api/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      // console.log(book);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book is not found in DB' });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/api/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({error: 'Book is not found in DB' });
      }
    } catch (e) {
      res.status(500).json({error: e.message });
    }
  });

  app.delete('/api/books/:id', async (req, res) => {
    try {
      const remove = await Book.deleteOne({ _id: req.params.id});
      if (remove.count > 0) {
        res.json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  