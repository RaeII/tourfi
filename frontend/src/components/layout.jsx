import { Outlet } from 'react-router-dom'
import { Header } from './header'

export function Layout() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
} 