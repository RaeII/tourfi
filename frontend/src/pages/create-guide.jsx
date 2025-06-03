import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, X, MapPin, Clock, DollarSign, Upload, Camera, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { categories } from '../data/mock-guides'

export default function CreateGuide() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    difficulty: 'Easy',
    price: 0,
    coverImage: null,
    tags: [],
    locations: []
  })
  const [currentTag, setCurrentTag] = useState('')
  const [currentLocation, setCurrentLocation] = useState({
    name: '',
    type: 'landmark',
    description: '',
    estimatedTime: '',
    coordinates: { lat: '', lng: '' },
    proofOfVisitRequired: true
  })
  const [showLocationForm, setShowLocationForm] = useState(false)

  const difficulties = ['Easy', 'Moderate', 'Hard', 'Expert']
  const locationTypes = [
    { value: 'landmark', label: 'Landmark' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'museum', label: 'Museum' },
    { value: 'temple', label: 'Temple' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'activity', label: 'Activity' },
    { value: 'winery', label: 'Winery' },
    { value: 'beach', label: 'Beach' },
    { value: 'park', label: 'Park' },
    { value: 'street', label: 'Street' },
    { value: 'other', label: 'Other' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addLocation = () => {
    if (currentLocation.name.trim()) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, {
          ...currentLocation,
          id: Date.now(),
          coordinates: {
            lat: parseFloat(currentLocation.coordinates.lat) || 0,
            lng: parseFloat(currentLocation.coordinates.lng) || 0
          }
        }]
      }))
      setCurrentLocation({
        name: '',
        type: 'landmark',
        description: '',
        estimatedTime: '',
        coordinates: { lat: '', lng: '' },
        proofOfVisitRequired: true
      })
      setShowLocationForm(false)
    }
  }

  const removeLocation = (locationId) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc.id !== locationId)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally submit to your API
    console.log('Guide created:', formData)
    // Navigate back to community guides with success message
    navigate('/community-guide')
  }

  const isFormValid = formData.title && formData.description && formData.category && formData.duration && formData.locations.length > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild className="btn-outline-primary">
                <Link to="/community-guide">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Guides
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-text-adaptive">Create Travel Guide</h1>
                <p className="text-muted-foreground">Share your travel experience and earn rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" type="button" className="btn-outline-primary">
                Save Draft
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                Publish Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-adaptive mb-2">
                    Guide Title *
                  </label>
                  <Input
                    placeholder="e.g. Tokyo Adventure: Hidden Gems and Local Favorites"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-adaptive mb-2">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Describe your guide and what makes it special..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-adaptive mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-text-adaptive focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a category</option>
                      {categories.filter(cat => cat.id !== 'all').map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-adaptive mb-2">
                      Duration *
                    </label>
                    <Input
                      placeholder="e.g. 3 days, 5 hours"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-adaptive mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-text-adaptive focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {difficulties.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-adaptive mb-2">
                      Price (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="0 for free"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        className="pl-10"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-adaptive mb-2">Upload Cover Image</h3>
                  <p className="text-muted-foreground mb-4">Choose a beautiful image that represents your guide</p>
                  <Button variant="outline" className="btn-outline-primary">
                    <Camera className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag (e.g. Tokyo Tower, Sushi, Nightlife)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag} type="button" className="btn-primary">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="pr-1">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Locations/Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Itinerary & Locations *</span>
                  <Button
                    onClick={() => setShowLocationForm(true)}
                    type="button"
                    size="sm"
                    className="btn-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {formData.locations.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-adaptive mb-2">No locations added yet</h3>
                    <p className="text-muted-foreground mb-4">Add at least one location to create your guide</p>
                    <Button 
                      onClick={() => setShowLocationForm(true)} 
                      type="button"
                      className="btn-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Location
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.locations.map((location, index) => (
                      <Card key={location.id} className="border border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-text-adaptive">{location.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {locationTypes.find(t => t.value === location.type)?.label}
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
                                  <span>{location.coordinates.lat}, {location.coordinates.lng}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeLocation(location.id)}
                              type="button"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Add Location Form */}
                {showLocationForm && (
                  <Card className="mt-4 border-2 border-yellow-500/50">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Add New Location</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowLocationForm(false)}
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-adaptive mb-2">
                            Location Name *
                          </label>
                          <Input
                            placeholder="e.g. Tokyo Tower"
                            value={currentLocation.name}
                            onChange={(e) => setCurrentLocation(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-adaptive mb-2">
                            Type
                          </label>
                          <select
                            value={currentLocation.type}
                            onChange={(e) => setCurrentLocation(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-text-adaptive focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {locationTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-adaptive mb-2">
                          Description
                        </label>
                        <Textarea
                          placeholder="Describe this location and what visitors can expect..."
                          value={currentLocation.description}
                          onChange={(e) => setCurrentLocation(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-adaptive mb-2">
                            Estimated Time
                          </label>
                          <Input
                            placeholder="e.g. 2 hours"
                            value={currentLocation.estimatedTime}
                            onChange={(e) => setCurrentLocation(prev => ({ ...prev, estimatedTime: e.target.value }))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-adaptive mb-2">
                            Latitude
                          </label>
                          <Input
                            type="number"
                            placeholder="35.6586"
                            step="any"
                            value={currentLocation.coordinates.lat}
                            onChange={(e) => setCurrentLocation(prev => ({ 
                              ...prev, 
                              coordinates: { ...prev.coordinates, lat: e.target.value }
                            }))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-adaptive mb-2">
                            Longitude
                          </label>
                          <Input
                            type="number"
                            placeholder="139.7454"
                            step="any"
                            value={currentLocation.coordinates.lng}
                            onChange={(e) => setCurrentLocation(prev => ({ 
                              ...prev, 
                              coordinates: { ...prev.coordinates, lng: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="proofOfVisit"
                          checked={currentLocation.proofOfVisitRequired}
                          onChange={(e) => setCurrentLocation(prev => ({ 
                            ...prev, 
                            proofOfVisitRequired: e.target.checked 
                          }))}
                          className="rounded"
                        />
                        <label htmlFor="proofOfVisit" className="text-sm text-text-adaptive cursor-pointer">
                          Require proof-of-visit for reviews
                        </label>
                        <Shield className="h-4 w-4 text-blue-500" />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={addLocation}
                          type="button"
                          className="bg-yellow-500 hover:bg-yellow-600 text-black"
                        >
                          Add Location
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowLocationForm(false)}
                          type="button"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Preview & Tips */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-text-adaptive">
                      {formData.title || 'Your Guide Title'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {formData.description || 'Guide description will appear here...'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {formData.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formData.duration}</span>
                      </div>
                    )}
                    {formData.locations.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{formData.locations.length} stops</span>
                      </div>
                    )}
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {formData.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{formData.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Tips for a Great Guide</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Enable Proof-of-Visit</span>
                    <p className="text-muted-foreground">Guides with verified reviews rank higher and earn more rewards</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Camera className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Add Great Photos</span>
                    <p className="text-muted-foreground">High-quality images get 3x more engagement</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Include Exact Coordinates</span>
                    <p className="text-muted-foreground">Help travelers find locations easily</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewards Info */}
            <Card>
              <CardHeader>
                <CardTitle>🎁 Earn Rewards</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Guide Creation</span>
                  <span className="font-medium">100 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>First Review</span>
                  <span className="font-medium">50 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Featured Guide</span>
                  <span className="font-medium">500 XP</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Potential Tokens</span>
                    <span className="text-yellow-600">25 $TOUR</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 