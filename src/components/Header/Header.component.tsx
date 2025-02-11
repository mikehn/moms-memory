import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { RouteConsts } from '../../utils/consts/Routes.consts'
import { useTranslation } from 'react-i18next'
import { i18nKeys } from '../../assets/i18n/keys'
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer'
import LangSelector from '../LanguageSelector/LangSelector.component'
import { ProfileButton } from './ProfileButton.component'

// Reusable Navigation Menu Component
const NavigationMenu = ({ onItemClick }: { onItemClick?: () => void }) => {
  const { t } = useTranslation()
  const headerKeys = i18nKeys.component.header

  const menuItems = [
    { label: t(headerKeys.lifeStory), route: RouteConsts.LANDING },
    { label: t(headerKeys.Memories), route: RouteConsts.MEMORY_WALL },
    { label: t(headerKeys.obituaries), route: RouteConsts.OBITUARIES },
    { label: t(headerKeys.Gallery), route: RouteConsts.LANDING }
  ]

  return (
    <nav className="flex flex-col gap-4 md:flex-row md:gap-6">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.route}
          className="text-lg font-semibold md:text-sm md:font-medium"
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

const Header = ({ message }: { message: string }) => {
  console.log(message) // TODO: needs to be removed (used for testing)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <header className="border-b" dir="ltr">
      <div className="flex h-16 w-full items-center justify-between px-4">
        {/* Left section - Logo and Mobile Drawer */}
        <div className="flex items-center gap-6">
          {/* Drawer for Mobile View */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-screen w-full bg-white p-6 shadow-lg">
              <NavigationMenu onItemClick={closeDrawer} />
            </DrawerContent>
          </Drawer>

          <Link to={RouteConsts.LANDING}>
            <h2 className="text-xl font-bold">Emunah אמונה</h2>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <NavigationMenu />
        </div>

        {/* Right Section - Search and Actions */}
        <div className="flex items-center gap-4">
          {/* <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Search..." className="w-[200px] pl-8" />
            </div>
          </div> */}

          <LangSelector />
          <ProfileButton />
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>
      </div>
    </header>
  )
}

export default Header
