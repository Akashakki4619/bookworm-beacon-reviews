
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  bookId: number;
  onClose: () => void;
  onSubmit: () => void;
}

const ReviewForm = ({ bookId, onClose, onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating for your review.",
        variant: "destructive"
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Review Too Short",
        description: "Please write at least 10 characters for your review.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review Submitted!",
        description: "Thank you for your review. It has been posted successfully.",
      });
      
      setIsSubmitting(false);
      onSubmit();
    }, 1000);
  };

  const renderStarInput = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className="focus:outline-none"
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(i)}
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              i <= (hoveredRating || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      );
    }
    
    return stars;
  };

  return (
    <Card className="border-amber-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Write Your Review</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating *
            </label>
            <div className="flex items-center gap-1">
              {renderStarInput()}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                  {rating} out of 5 stars
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review *
            </label>
            <Textarea
              id="comment"
              placeholder="Share your thoughts about this book... What did you like or dislike? Would you recommend it to others?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px] border-amber-200 focus:border-amber-400"
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500 mt-1">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-amber-200 text-amber-600 hover:bg-amber-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
