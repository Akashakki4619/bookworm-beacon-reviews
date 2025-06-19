
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Search, BookOpen, Users, TrendingUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BookCard from '@/components/BookCard';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock featured books data
  const featuredBooks = [
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
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Books", value: "10,234" },
    { icon: Users, label: "Readers", value: "45,678" },
    { icon: Star, label: "Reviews", value: "123,456" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Great Read
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of book lovers sharing reviews, discovering new favorites, and building their personal libraries.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for books, authors, genres..."
                className="pl-10 h-12 text-lg border-2 border-amber-200 focus:border-amber-400 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8">
              <Link to="/books">Browse Books</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-amber-600 text-amber-600 hover:bg-amber-50 rounded-full px-8">
              <Link to="/profile">My Profile</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-6 w-6 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-amber-600 text-amber-600 hover:bg-amber-50">
            <Link to="/books">View All Books</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
