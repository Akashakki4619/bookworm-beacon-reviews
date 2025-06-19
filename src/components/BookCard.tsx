
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviews: number;
  coverImage: string;
  description: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Link to={`/books/${book.id}`}>
      <Card className="group cursor-pointer border-amber-200 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden h-full">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-4 flex-1">
          <div className="mb-2">
            <Badge variant="outline" className="text-amber-600 border-amber-200 mb-2">
              {book.genre}
            </Badge>
          </div>
          
          <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
            {book.title}
          </h3>
          
          <p className="text-gray-600 mb-3 font-medium">
            by {book.author}
          </p>
          
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">
            {book.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              {renderStars(book.rating)}
              <span className="text-sm text-gray-600 ml-1">
                {book.rating}
              </span>
            </div>
            
            <span className="text-sm text-gray-500">
              {book.reviews} reviews
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
