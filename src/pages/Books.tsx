
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, Filter, SortAsc } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BookCard from '@/components/BookCard';

const Books = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  // Mock books data
  const allBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      rating: 4.5,
      reviews: 142,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      description: "A gripping psychological thriller about a woman's act of violence against her husband."
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      rating: 4.8,
      reviews: 256,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "A powerful memoir about education, transformation, and the price of growing up."
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      genre: "Fiction",
      rating: 4.7,
      reviews: 198,
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      description: "A captivating novel about a reclusive Hollywood icon who finally decides to tell her story."
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.6,
      reviews: 324,
      coverImage: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
      description: "Tiny changes, remarkable results. Transform your life with small, consistent improvements."
    },
    {
      id: 5,
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.3,
      reviews: 287,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "Between life and death lies a library, and within its shelves live infinite possibilities."
    },
    {
      id: 6,
      title: "Becoming",
      author: "Michelle Obama",
      genre: "Memoir",
      rating: 4.9,
      reviews: 445,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      description: "An intimate and powerful memoir by the former First Lady of the United States."
    }
  ];

  const genres = ['all', 'Fiction', 'Thriller', 'Memoir', 'Self-Help', 'Romance', 'Mystery'];

  // Filter and sort books
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesRating = selectedRating === 'all' || 
                         (selectedRating === '4+' && book.rating >= 4) ||
                         (selectedRating === '3+' && book.rating >= 3);
    
    return matchesSearch && matchesGenre && matchesRating;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Books</h1>
          <p className="text-gray-600 text-lg">Discover your next favorite read from our collection</p>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8 border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search books or authors..."
                  className="pl-10 border-amber-200 focus:border-amber-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Genre Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="border-amber-200 focus:border-amber-400">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="border-amber-200 focus:border-amber-400">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3+">3+ Stars</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-amber-200 focus:border-amber-400">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="reviews">Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {paginatedBooks.length} of {sortedBooks.length} books
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-amber-200 text-amber-600 hover:bg-amber-50"
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "border-amber-200 text-amber-600 hover:bg-amber-50"
                }
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-amber-200 text-amber-600 hover:bg-amber-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
