import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Star, Heart, MessageSquare, MapPin, Clock, Share2, 
  Shield, Award, User, Calendar, DollarSign, CheckCircle, 
  ChevronDown, ChevronUp, Camera, ExternalLink, Bookmark
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Textarea } from '../components/ui/textarea'
import { mockGuides, mockComments } from '../data/mock-guides'

export default function GuideDetail() {
  const { id } = useParams()
  const [showAllLocations, setShowAllLocations] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [activeTab, setActiveTab] = useState('overview') // overview, itinerary, reviews, q&a
  
  const guide = useMemo(() => {
    return mockGuides.find(g => g.id === parseInt(id))
  }, [id])

  const comments = useMemo(() => {
    return mockComments.filter(c => c.guideId === parseInt(id))
  }, [id])

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-adaptive mb-4">Guide not found</h2>
          <Button asChild>
            <Link to="/community-guide">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guides
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const visibleLocations = showAllLocations ? guide.locations : guide.locations.slice(0, 3)

  const ProofOfVisitBadge = ({ comment }) => (
    <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <div className="text-xs">
        <span className="font-medium text-green-800 dark:text-green-200">Verified Visit:</span>
        <span className="text-green-600 dark:text-green-300 ml-1">
          {comment.proofOfVisit.location}
        </span>
      </div>
    </div>
  )

  const LocationCard = ({ location, index }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-text-adaptive">{location.name}</h4>
              <Badge variant="outline" className="text-xs">
                {location.type}
              </Badge>
              {location.proofOfVisitRequired && (
                <Shield className="h-4 w-4 text-blue-500" title="Proof of visit required" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{location.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{location.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const CommentCard = ({ comment }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <img 
            src={comment.author.avatar} 
            alt={comment.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-text-adaptive">{comment.author.name}</span>
              <Badge variant="outline" className="text-xs">{comment.author.level}</Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {comment.verified && comment.proofOfVisit && (
              <ProofOfVisitBadge comment={comment} />
            )}
            
            <p className="text-sm text-text-adaptive mt-2 mb-3">{comment.content}</p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-text-adaptive transition-colors">
                <Heart className="h-3 w-3" />
                <span>{comment.likes}</span>
              </button>
              <button className="hover:text-text-adaptive transition-colors">Reply</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={guide.coverImage} 
          alt={guide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button variant="outline" size="sm" asChild className="bg-white/90 backdrop-blur-sm">
            <Link to="/community-guide">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guides
            </Link>
          </Button>
        </div>

        {/* Title and Basic Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{guide.title}</h1>
                  {guide.verified && (
                    <Shield className="h-6 w-6 text-blue-400" />
                  )}
                  {guide.featured && (
                    <Badge className="bg-yellow-500 text-black font-semibold">Featured</Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-6 text-white/90 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-white">{guide.rating}</span>
                    <span className="text-white/90">({guide.reviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-white/90">{guide.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-white/90">{guide.locations.length} locations</span>
                  </div>
                  <Badge variant={guide.price === 0 ? "success" : "info"}>
                    {guide.price === 0 ? 'Free' : `$${guide.price}`}
                  </Badge>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img 
                    src={guide.author.avatar} 
                    alt={guide.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{guide.author.name}</span>
                      <Badge variant="outline" className="text-xs border-white/30 text-white">
                        {guide.author.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <Award className="h-3 w-3" />
                      <span>{guide.author.xp} XP</span>
                      <span>•</span>
                      <span>{guide.author.verifiedVisits} verified visits</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="ml-1">{guide.likesCount + (isLiked ? 1 : 0)}</span>
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex gap-1 mb-6 p-1 bg-muted rounded-lg">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Itinerary' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'qa', label: 'Q&A' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-background text-text-adaptive shadow-sm' 
                      : 'text-muted-foreground hover:text-text-adaptive'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About This Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-adaptive leading-relaxed mb-4">
                      {guide.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>

                    {/* Guide Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-text-adaptive">{guide.locations.length}</div>
                        <div className="text-xs text-muted-foreground">Locations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-text-adaptive">{guide.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-text-adaptive">{guide.difficulty}</div>
                        <div className="text-xs text-muted-foreground">Difficulty</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-text-adaptive">{guide.reviewsCount}</div>
                        <div className="text-xs text-muted-foreground">Reviews</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Itinerary ({guide.locations.length} stops)</span>
                      <Button variant="outline" size="sm" className="btn-outline-primary">
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {visibleLocations.map((location, index) => (
                      <LocationCard key={location.id} location={location} index={index} />
                    ))}
                    
                    {guide.locations.length > 3 && (
                      <Button
                        variant="outline"
                        onClick={() => setShowAllLocations(!showAllLocations)}
                        className="w-full"
                      >
                        {showAllLocations ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Show All {guide.locations.length} Locations
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Reviews Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews & Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-text-adaptive">{guide.rating}</div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(guide.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{guide.reviewsCount} reviews</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-2">
                              <span className="text-sm w-4">{rating}</span>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full" 
                                  style={{ width: `${rating === 5 ? 60 : rating === 4 ? 30 : 10}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-muted-foreground w-8">
                                {rating === 5 ? '60%' : rating === 4 ? '30%' : '10%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Write Review */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium text-text-adaptive mb-3">Share your experience</h4>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Tell others about your experience with this guide..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Add photos for proof-of-visit</span>
                          </div>
                          <Button size="sm" className="text-white">Post Review</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div>
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'qa' && (
              <Card>
                <CardHeader>
                  <CardTitle>Questions & Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-adaptive mb-2">No questions yet</h3>
                    <p className="text-muted-foreground mb-4">Be the first to ask a question about this guide.</p>
                    <Button className="text-white">Ask a Question</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-text-adaptive mb-2">
                    {guide.price === 0 ? 'Free Guide' : `$${guide.price}`}
                  </div>
                  {guide.price > 0 && (
                    <p className="text-sm text-muted-foreground">Per person</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-white">
                    {guide.price === 0 ? 'Start This Guide' : 'Book Now'}
                  </Button>
                  <Button variant="outline" className="w-full btn-outline-primary">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Proof of Visit Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Proof-of-Visit System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-adaptive">Verified Reviews Only</h4>
                    <p className="text-sm text-muted-foreground">All reviews require proof of visit through our blockchain verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-adaptive">Earn Rewards</h4>
                    <p className="text-sm text-muted-foreground">Complete the guide and earn $TOUR tokens for verified visits</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-adaptive">NFT Collectibles</h4>
                    <p className="text-sm text-muted-foreground">Receive unique NFT badges for each location you visit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Card */}
            <Card>
              <CardHeader>
                <CardTitle>Guide Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={guide.author.avatar} 
                    alt={guide.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-text-adaptive">{guide.author.name}</h4>
                    <Badge variant="outline" className="text-xs">{guide.author.level}</Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Experience Points</span>
                    <span className="font-medium text-text-adaptive">{guide.author.xp} XP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verified Visits</span>
                    <span className="font-medium text-text-adaptive">{guide.author.verifiedVisits}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium text-text-adaptive">2023</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 