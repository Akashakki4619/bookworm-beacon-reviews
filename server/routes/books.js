
const express = require('express');
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');
const Review = require('../models/Review');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all books with pagination, search, and filters
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    const { search, genre, rating, sort } = req.query;
    
    // Build query
    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (genre && genre !== 'all') {
      query.genre = genre;
    }
    
    if (rating && rating !== 'all') {
      if (rating === '4+') {
        query.avgRating = { $gte: 4 };
      } else if (rating === '3+') {
        query.avgRating = { $gte: 3 };
      }
    }
    
    // Build sort
    let sortQuery = {};
    switch (sort) {
      case 'title':
        sortQuery.title = 1;
        break;
      case 'author':
        sortQuery.author = 1;
        break;
      case 'rating':
        sortQuery.avgRating = -1;
        break;
      case 'reviews':
        sortQuery.reviewCount = -1;
        break;
      default:
        sortQuery.createdAt = -1;
    }
    
    const books = await Book.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'username');
    
    const total = await Book.countDocuments(query);
    
    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'username');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new book (admin only)
router.post('/', [
  auth,
  adminAuth,
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('publishedDate').isISO8601().withMessage('Valid published date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookData = {
      ...req.body,
      createdBy: req.user._id
    };

    const book = new Book(bookData);
    await book.save();
    
    await book.populate('createdBy', 'username');
    
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book (admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete book (admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Delete all reviews for this book
    await Review.deleteMany({ bookId: req.params.id });
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
