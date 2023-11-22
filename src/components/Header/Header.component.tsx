import React from 'react'
import { Bell, Search, Settings, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { RouteConsts } from '../../utils/consts/Routes.consts'

const Header = ({ message }: { message: string }) => {
  return (
    <header className="border-b">
      <div className="flex h-16 w-full items-center justify-between px-4">
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="size-5" />
          </Button>
          <Link to={RouteConsts.LANDING}>
            <h2 className="text-xl font-bold">Emunah אמונה</h2>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Button variant="link">Home</Button>
            <Button variant="link">Products</Button>
            <Button variant="link">{message}</Button>
          </nav>
        </div>

        {/* Right section - Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Search..." className="w-[200px] pl-8" />
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <Bell className="size-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
