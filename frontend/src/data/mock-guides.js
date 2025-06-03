export const mockGuides = [
  {
    id: 1,
    title: "Tokyo Adventure",
    description: "Explore the best spots in Tokyo with this comprehensive guide. From the busy streets of Shibuya to the serene gardens...",
    author: {
      id: 1,
      name: "JohnDoe",
      avatar: "https://i.pravatar.cc/40?img=1",
      xp: 1250,
      level: "Explorer",
      verifiedVisits: 15
    },
    coverImage: "https://w.wallhaven.cc/full/1j/wallhaven-1j2mdw.jpg",
    rating: 4.9,
    reviewsCount: 324,
    likesCount: 124,
    commentsCount: 32,
    tags: ["Shibuya Crossing", "Tokyo Tower", "Meiji Shrine", "+2 more"],
    category: "City Tour",
    duration: "3 days",
    difficulty: "Easy",
    price: 0, // Free guide
    locations: [
      {
        id: 1,
        name: "Shibuya Crossing",
        type: "landmark",
        coordinates: { lat: 35.6598, lng: 139.7006 },
        description: "The famous scramble crossing",
        estimatedTime: "30 minutes",
        proofOfVisitRequired: true
      },
      {
        id: 2,
        name: "Tokyo Tower",
        type: "landmark", 
        coordinates: { lat: 35.6586, lng: 139.7454 },
        description: "Iconic red tower with city views",
        estimatedTime: "2 hours",
        proofOfVisitRequired: true
      },
      {
        id: 3,
        name: "Meiji Shrine",
        type: "temple",
        coordinates: { lat: 35.6763, lng: 139.6993 },
        description: "Peaceful shrine in the heart of Tokyo",
        estimatedTime: "1 hour",
        proofOfVisitRequired: true
      }
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    featured: true,
    verified: true
  },
  {
    id: 2,
    title: "Complete Douro Valley Wine Tour",
    description: "Experience the breathtaking Douro Valley with this complete wine tour guide. Visit vineyards, taste local wines, and enjoy river cruises.",
    author: {
      id: 2,
      name: "WineExplorer",
      avatar: "https://i.pravatar.cc/40?img=2",
      xp: 2100,
      level: "Expert",
      verifiedVisits: 28
    },
    coverImage: "https://images.unsplash.com/photo-1717451062577-486c76785d25?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    reviewsCount: 156,
    likesCount: 89,
    commentsCount: 24,
    tags: ["Wine Tasting", "River Cruise", "Vineyards", "Lunch"],
    category: "Wine & Food",
    duration: "1 day",
    difficulty: "Moderate",
    price: 114.34, // Paid tour
    locations: [
      {
        id: 4,
        name: "Quinta da Pacheca",
        type: "winery",
        coordinates: { lat: 41.2033, lng: -7.7811 },
        description: "Historic winery with river views",
        estimatedTime: "2 hours",
        proofOfVisitRequired: true
      },
      {
        id: 5,
        name: "Douro River Cruise",
        type: "activity",
        coordinates: { lat: 41.1579, lng: -7.7956 },
        description: "Scenic boat trip along the Douro",
        estimatedTime: "3 hours",
        proofOfVisitRequired: true
      }
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    featured: true,
    verified: true
  },
  {
    id: 3,
    title: "Hidden Gems of Paris",
    description: "Discover the secret spots that locals love in Paris. Away from tourist crowds, explore authentic neighborhoods and hidden cafes.",
    author: {
      id: 3,
      name: "ParisianLocal",
      avatar: "https://i.pravatar.cc/40?img=3",
      xp: 1800,
      level: "Local Expert",
      verifiedVisits: 42
    },
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop",
    rating: 4.8,
    reviewsCount: 203,
    likesCount: 156,
    commentsCount: 18,
    tags: ["Hidden Spots", "Local Culture", "Cafes", "Street Art"],
    category: "Culture",
    duration: "2 days",
    difficulty: "Easy",
    price: 0,
    locations: [
      {
        id: 6,
        name: "Passage des Panoramas",
        type: "shopping",
        coordinates: { lat: 48.8719, lng: 2.3422 },
        description: "Historic covered passage",
        estimatedTime: "45 minutes",
        proofOfVisitRequired: true
      },
      {
        id: 7,
        name: "Rue Crémieux",
        type: "street",
        coordinates: { lat: 48.8467, lng: 2.3714 },
        description: "Colorful cobblestone street",
        estimatedTime: "20 minutes",
        proofOfVisitRequired: true
      }
    ],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
    featured: false,
    verified: true
  },
  {
    id: 4,
    title: "Bali Temple Hopping",
    description: "A spiritual journey through Bali's most beautiful temples. Learn about Hindu culture and traditional architecture.",
    author: {
      id: 4,
      name: "TempleSeeker",
      avatar: "https://i.pravatar.cc/40?img=4",
      xp: 950,
      level: "Traveler",
      verifiedVisits: 12
    },
    coverImage: "https://images.unsplash.com/photo-1558005530-a7958896ec60?q=80&w=2000&auto=format&fit=crop",
    rating: 4.6,
    reviewsCount: 87,
    likesCount: 67,
    commentsCount: 15,
    tags: ["Temples", "Culture", "Spirituality", "Architecture"],
    category: "Spiritual",
    duration: "1 day",
    difficulty: "Moderate",
    price: 0,
    locations: [
      {
        id: 8,
        name: "Tanah Lot Temple",
        type: "temple",
        coordinates: { lat: -8.6212, lng: 115.0868 },
        description: "Temple on a rock formation",
        estimatedTime: "1.5 hours",
        proofOfVisitRequired: true
      },
      {
        id: 9,
        name: "Uluwatu Temple",
        type: "temple",
        coordinates: { lat: -8.8290, lng: 115.0854 },
        description: "Cliffside temple with sunset views",
        estimatedTime: "2 hours",
        proofOfVisitRequired: true
      }
    ],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-08",
    featured: false,
    verified: false
  }
];

export const mockComments = [
  {
    id: 1,
    guideId: 1,
    author: {
      id: 5,
      name: "TravelLover",
      avatar: "https://i.pravatar.cc/32?img=5",
      xp: 680,
      level: "Adventurer"
    },
    content: "Amazing guide! The proof-of-visit system really ensures authentic reviews. Tokyo Tower was breathtaking!",
    rating: 5,
    verified: true,
    proofOfVisit: {
      location: "Tokyo Tower",
      timestamp: "2024-01-22T10:30:00Z",
      nftId: "0x123...abc"
    },
    createdAt: "2024-01-22T12:00:00Z",
    likes: 8
  },
  {
    id: 2,
    guideId: 1,
    author: {
      id: 6,
      name: "CityExplorer",
      avatar: "https://i.pravatar.cc/32?img=6",
      xp: 1100,
      level: "Explorer"
    },
    content: "Perfect timing for Shibuya Crossing! The crowd wasn't too bad in the morning. Great tips!",
    rating: 5,
    verified: true,
    proofOfVisit: {
      location: "Shibuya Crossing",
      timestamp: "2024-01-20T09:15:00Z",
      nftId: "0x456...def"
    },
    createdAt: "2024-01-20T14:30:00Z",
    likes: 12
  }
];

export const categories = [
  { id: 'all', name: 'All', icon: '🌍' },
  { id: 'city-tour', name: 'City Tours', icon: '🏙️' },
  { id: 'nature', name: 'Nature', icon: '🌲' },
  { id: 'culture', name: 'Culture', icon: '🎭' },
  { id: 'food', name: 'Food & Wine', icon: '🍷' },
  { id: 'adventure', name: 'Adventure', icon: '🏔️' },
  { id: 'spiritual', name: 'Spiritual', icon: '🕉️' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌃' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' }
]; 