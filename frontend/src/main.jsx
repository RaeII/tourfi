import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18n' // Import i18n configuration
import './index.css'
import { MetamaskProvider } from './context/Metamask'
import { OnChainProvider } from './context/onChain'
import { Layout } from './components/layout'
import HomePage from './pages/home'
import CommunityGuide from './pages/community-guide'
import GuideDetail from './pages/guide-detail'
import CreateGuide from './pages/create-guide'
import SearchResults from './pages/search-results'
import Booking from './pages/booking'
import CardApplication from './pages/CardApplication'
import MyBookings from './pages/my-bookings'
import { ThemeProvider } from './components/theme-provider'

// Criar uma instância do QueryClient para o TanStack Query
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'community-guide',
        element: <CommunityGuide />
      },
      {
        path: 'community-guide/create',
        element: <CreateGuide />
      },
      {
        path: 'community-guide/:id',
        element: <GuideDetail />
      },
      {
        path: 'search-results',
        element: <SearchResults />
      },
      {
        path: 'booking',
        element: <Booking />
      },
      {
        path: 'my-bookings',
        element: <MyBookings />
      },
      {
        path: 'card-application',
        element: <CardApplication />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="fanatique-theme">
      <QueryClientProvider client={queryClient}>
        <MetamaskProvider>
          <OnChainProvider>
            <RouterProvider router={router} />
          </OnChainProvider>
        </MetamaskProvider>
        <Toaster 
            position="top-right"
            gutter={20}
            containerStyle={{
              top: 80,
              right: 20,
            }}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#1D7D40',
                  },
                },
              },
            }}
          />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
