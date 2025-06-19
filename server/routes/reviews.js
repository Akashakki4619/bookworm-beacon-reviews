
const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Book = require('../models/Book');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get reviews for a book
router.get('/', async (req, res) => {
  try {
    const { bookId } = req.query;
    
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }
    
    const reviews = await Review.find({ bookId })
      .populate('userId', 'username profileImage')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new review
router.post('/', [
  auth,
  body('bookId').isMongoId().withMessage('Valid book ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 10, max: 1000 }).withMessage('Comment must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId, rating, comment } = req.body;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ 
      userId: req.user._id, 
      bookId 
    });
    
    if (existingReview) {
      return res.status(400).json({ 
        message: 'You have already reviewed this book' 
      });
    }
    
    // Create review
    const review = new Review({
      userId: req.user._id,
      bookId,
      rating,
      comment
    });
    
    await review.save();
    await review.populate('userId', 'username profileImage');
    
    // Update book's average rating and review count
    const reviews = await Review.find({ bookId });
    const avgRating = reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;
    
    await Book.findByIdAndUpdate(bookId, {
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    });
    
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update review
router.put('/:id', [
  auth,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 10, max: 1000 }).withMessage('Comment must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'username profileImage');
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    
    // Update book's average rating
    const reviews = await Review.find({ bookId: review.bookId });
    const avgRating = reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;
    
    await Book.findByIdAndUpdate(review.bookId, {
      avgRating: Math.round(avgRating * 10) / 10
    });
    
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    
    // Update book's average rating and review count
    const reviews = await Review.find({ bookId: review.bookId });
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length 
      : 0;
    
    await Book.findByIdAndUpdate(review.bookId, {
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    });
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
