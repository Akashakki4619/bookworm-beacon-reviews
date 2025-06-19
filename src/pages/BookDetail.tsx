
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, ArrowLeft, Calendar, User } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ReviewForm from '@/components/ReviewForm';

const BookDetail = () => {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock book data
  const book = {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    rating: 4.5,
    reviews: 142,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word. Alicia's refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety.",
    publishedDate: "2019-02-05",
    pages: 336,
    isbn: "978-1250301697"
  };

  // Mock reviews data
  const bookReviews = [
    {
      id: 1,
      userId: 1,
      username: "BookLover23",
      rating: 5,
      comment: "Absolutely captivating! I couldn't put it down. The psychological twists kept me guessing until the very end.",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      userId: 2,
      username: "ReadingAddict",
      rating: 4,
      comment: "Great thriller with an interesting premise. The ending was a bit predictable but still enjoyable overall.",
      createdAt: "2024-01-10T14:22:00Z"
    },
    {
      id: 3,
      userId: 3,
      username: "MysteryFan",
      rating: 5,
      comment: "One of the best psychological thrillers I've read in years. The character development is exceptional.",
      createdAt: "2024-01-05T09:15:00Z"
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-5 w-5 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-amber-600 hover:bg-amber-50">
          <Link to="/books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Info */}
          <div className="lg:col-span-1">
            <Card className="border-amber-200 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover"
                />
              </CardContent>
            </Card>

            <Card className="mt-6 border-amber-200">
              <CardHeader>
                <CardTitle className="text-lg">Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">{formatDate(book.publishedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ISBN:</span>
                  <span className="font-medium text-sm">{book.isbn}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="bg-amber-100 text-amber-800 mb-3">
                {book.genre}
              </Badge>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                by {book.author}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(book.rating)}
                  <span className="text-lg font-semibold ml-2">
                    {book.rating}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({book.reviews} reviews)
                </span>
              </div>

              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Write a Review
              </Button>
            </div>

            {/* Description */}
            <Card className="mb-8 border-amber-200">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </CardContent>
            </Card>

            {/* Review Form */}
            {showReviewForm && (
              <div className="mb-8">
                <ReviewForm 
                  bookId={book.id} 
                  onClose={() => setShowReviewForm(false)}
                  onSubmit={() => setShowReviewForm(false)}
                />
              </div>
            )}

            {/* Reviews */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle>Reviews ({bookReviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {bookReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {review.username}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
