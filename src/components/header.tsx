import { Home, Pizza, UtensilsCrossed } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { AccountMenu } from './account-menu'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

const navLinks = [
  { label: 'Início', icon: Home, to: '/' },
  { label: 'Pedidos', icon: UtensilsCrossed, to: '/orders' },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          {navLinks.map((navLink) => (
            <Link
              data-active={pathname === navLink.to}
              key={navLink.to}
              to={navLink.to}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
            >
              <navLink.icon className="h-4 w-4" />
              <span>{navLink.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}
