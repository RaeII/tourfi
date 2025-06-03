import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Star, Heart, MessageSquare, MapPin, Clock, DollarSign, Shield, User, Award } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { mockGuides, categories } from '../data/mock-guides'

export default function CommunityGuide() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('rating') // rating, newest, popular
  const [showOnlyVerified, setShowOnlyVerified] = useState(false)

  // Filter and sort guides
  const filteredGuides = useMemo(() => {
    let filtered = mockGuides.filter(guide => {
      const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || 
                             guide.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
                             guide.category.toLowerCase().includes(selectedCategory.replace('-', ' '))
      
      const matchesVerified = !showOnlyVerified || guide.verified
      
      return matchesSearch && matchesCategory && matchesVerified
    })

    // Sort guides
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'popular':
          return b.likesCount - a.likesCount
        case 'rating':
        default:
          return b.rating - a.rating
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, showOnlyVerified])

  const GuideCard = ({ guide }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-yellow-400/10 dark:border-blue-400/10 hover:border-yellow-500/50 dark:hover:border-blue-500/50 bg-white dark:bg-gray-900/70">
      <div className="relative">
        <img 
          src={guide.coverImage} 
          alt={guide.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {guide.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-blue-400 dark:to-blue-600 text-white font-semibold">
            Featured
          </Badge>
        )}
        {guide.price === 0 ? (
          <Badge variant="success" className="absolute top-3 right-3">
            Free
          </Badge>
        ) : (
          <Badge variant="info" className="absolute top-3 right-3">
            ${guide.price}
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            <Link to={`/community-guide/${guide.id}`}>
              {guide.title}
            </Link>
          </h3>
          {guide.verified && (
            <Shield className="h-5 w-5 text-yellow-500 dark:text-blue-400 flex-shrink-0 ml-2" />
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {guide.description}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={guide.author.avatar} 
            alt={guide.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-gray-900 dark:text-white">
                {guide.author.name}
              </span>
              <Badge variant="outline" className="text-xs border-yellow-400/20 dark:border-blue-400/20">
                {guide.author.level}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Award className="h-3 w-3" />
              <span>{guide.author.xp} XP</span>
              <span>•</span>
              <span>{guide.author.verifiedVisits} visits</span>
            </div>
          </div>
        </div>

        {/* Guide Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{guide.rating}</span>
            <span>({guide.reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{guide.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{guide.locations.length} stops</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {guide.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-yellow-400/20 dark:border-blue-400/20">
              {tag}
            </Badge>
          ))}
          {guide.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-yellow-400/20 dark:border-blue-400/20">
              +{guide.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-yellow-400/10 dark:border-blue-400/10">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{guide.likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{guide.commentsCount}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild className="btn-outline-primary">
            <Link to={`/community-guide/${guide.id}`}>
              View Guide
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/10 dark:from-blue-400/10 dark:via-transparent dark:to-blue-700/20">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="relative container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Community Travel Guides
          </h1>
          <p className="text-xl text-gray-700 dark:text-white/90 mb-8 max-w-2xl mx-auto">
            Discover authentic travel experiences created by verified travelers. 
            Share your journeys and earn rewards through our Web3 proof-of-visit system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium" 
              asChild
            >
              <Link to="/community-guide/create">
                <Plus className="h-5 w-5 mr-2" />
                Create Your Guide
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-outline-primary"
            >
              Learn About Proof-of-Visit
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guides, destinations, or experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-text-adaptive focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* Verified Filter */}
            <label className="flex items-center gap-2 px-3 py-2 border border-input rounded-md bg-background cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyVerified}
                onChange={(e) => setShowOnlyVerified(e.target.checked)}
                className="rounded"
              />
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Verified Only</span>
            </label>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 text-white font-medium" 
                    : "btn-outline-primary"
                }
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-adaptive mb-2">No guides found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or explore different categories.
            </p>
            <Button asChild>
              <Link to="/community-guide/create">
                <Plus className="h-4 w-4 mr-2" />
                Create the first guide for this category
              </Link>
            </Button>
          </div>
        )}

        {/* Featured Banner */}
        <section className="mt-16 p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-border/50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-adaptive mb-4">
              Earn Rewards for Quality Guides
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create verified guides with our proof-of-visit system and earn $TOUR tokens. 
              Help fellow travelers discover amazing experiences while building your reputation as a trusted guide creator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold" asChild>
                <Link to="/community-guide/create">
                  Start Creating
                </Link>
              </Button>
              <Button variant="outline" className="text-text-adaptive">
                Learn More About Rewards
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 