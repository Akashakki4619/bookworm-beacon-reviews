
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Edit, Book, Star, Calendar } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BookCard from '@/components/BookCard';
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'BookLover23',
    email: 'booklover@example.com',
    bio: 'Passionate reader who loves psychological thrillers and literary fiction. Always looking for my next great read!',
    joinDate: '2023-01-15',
    totalReviews: 47,
    averageRating: 4.2
  });

  const { toast } = useToast();

  // Mock user's reviewed books
  const reviewedBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      rating: 5,
      reviews: 142,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      description: "A gripping psychological thriller about a woman's act of violence against her husband.",
      userRating: 5,
      userReview: "Absolutely captivating! I couldn't put it down."
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      rating: 4.8,
      reviews: 256,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "A powerful memoir about education, transformation, and the price of growing up.",
      userRating: 4,
      userReview: "A powerful and moving memoir about the importance of education."
    }
  ];

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="border-amber-200">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">{profileData.username}</CardTitle>
                  <p className="text-gray-500">{profileData.email}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Member since {formatDate(profileData.joinDate)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">
                        {profileData.totalReviews}
                      </div>
                      <div className="text-sm text-gray-600">Reviews</div>
                    </div>
                    
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">
                        {profileData.averageRating}
                      </div>
                      <div className="text-sm text-gray-600">Avg Rating</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="w-full border-amber-200 text-amber-600 hover:bg-amber-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="bio" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bio">Profile Info</TabsTrigger>
                  <TabsTrigger value="reviews">My Reviews</TabsTrigger>
                </TabsList>

                {/* Bio Tab */}
                <TabsContent value="bio">
                  <Card className="border-amber-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        About Me
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Username
                            </label>
                            <Input
                              value={profileData.username}
                              onChange={(e) => setProfileData({
                                ...profileData,
                                username: e.target.value
                              })}
                              className="border-amber-200 focus:border-amber-400"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <Input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({
                                ...profileData,
                                email: e.target.value
                              })}
                              className="border-amber-200 focus:border-amber-400"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bio
                            </label>
                            <Textarea
                              value={profileData.bio}
                              onChange={(e) => setProfileData({
                                ...profileData,
                                bio: e.target.value
                              })}
                              className="min-h-[100px] border-amber-200 focus:border-amber-400"
                            />
                          </div>
                          
                          <Button
                            onClick={handleSaveProfile}
                            className="bg-amber-600 hover:bg-amber-700 text-white"
                          >
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Username
                            </label>
                            <p className="text-gray-900">{profileData.username}</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <p className="text-gray-900 flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {profileData.email}
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bio
                            </label>
                            <p className="text-gray-700 leading-relaxed">
                              {profileData.bio}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Book className="h-5 w-5" />
                        My Reviews ({reviewedBooks.length})
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {reviewedBooks.map((book) => (
                        <Card key={book.id} className="border-amber-200">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-20 h-28 object-cover rounded-md"
                              />
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-semibold text-lg text-gray-900">
                                      {book.title}
                                    </h4>
                                    <p className="text-gray-600">by {book.author}</p>
                                  </div>
                                  
                                  <Badge className="bg-amber-100 text-amber-800">
                                    {book.genre}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-sm text-gray-600">My rating:</span>
                                  <div className="flex items-center">
                                    {renderStars(book.userRating)}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {book.userRating}/5
                                  </span>
                                </div>
                                
                                <p className="text-gray-700 leading-relaxed">
                                  {book.userReview}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
