import { ReactNode, useState } from 'react'
import { TestBox } from '../Test.component'
import { BellRing, Check, ChevronDown, ChevronUp, Menu } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../ui/card'
import { Switch } from '../../ui/switch'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import React from 'react'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { cn } from '../../../utils/shadcn/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { useToast } from '../../../utils/hooks/use-toast'
import { ToastAction } from '../../ui/toast'
import { Drawer, DrawerContent, DrawerTrigger } from '../../ui/drawer'

const UiComponentTest = () => {
  return (
    <TestBox
      title="Ui Components Test"
      description="Test ui component design and functionality"
    >
      <UiBox title="Alert">
        <AlertTest />
      </UiBox>
      <UiBox title="Button">
        <ButtonTest />
      </UiBox>
      <UiBox title="Card with content">
        <CardTest />
      </UiBox>
      <UiBox title="Drawer">
        <DrawerTest />
      </UiBox>
      <UiBox title="DropDown">
        <DropDownTest />
      </UiBox>
      <UiBox title="Input + Label">
        <InputTest />
      </UiBox>
      <UiBox title="Switch">
        <SwitchTest />
      </UiBox>
      <UiBox title="Tabs">
        <TabsTest />
      </UiBox>
      <UiBox title="Toast">
        <ToastTest />
      </UiBox>
    </TestBox>
  )
}

export const UiBox = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => {
    setIsCollapsed((prev: boolean) => !prev)
  }

  return (
    <div className="border-y border-slate-200">
      <div
        className="flex cursor-pointer items-center justify-between bg-slate-50 px-4 py-2 hover:bg-slate-200"
        onClick={toggleCollapse}
      >
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        {isCollapsed ? (
          <ChevronDown className="size-5 text-slate-500" />
        ) : (
          <ChevronUp className="size-5 text-slate-500" />
        )}
      </div>
      {!isCollapsed && <div className="p-4">{children}</div>}
    </div>
  )
}
const AlertTest = () => {
  return (
    <Alert className="bg-green-50">
      <AlertTitle className="text-green-800">
        This is an alert component
      </AlertTitle>
      <AlertDescription>description of the alert goes here</AlertDescription>
    </Alert>
  )
}

const ButtonTest = () => {
  const getTime = () => new Date().toLocaleTimeString()
  const [time, setTime] = useState('Never')
  return (
    <div>
      <Button
        className="bg-orange-800"
        onClick={() => {
          setTime(getTime())
        }}
      >
        Click Me
      </Button>
      <p>Last pressed {time}</p>
    </div>
  )
}

const CardTest = () => {
  const notifications = [
    {
      title: 'Call from wife.',
      description: '0 hours ago'
    },
    {
      title: 'You have a new message!',
      description: '1 hour ago'
    },
    {
      title: 'Your meeting is starting soon!',
      description: '2 hours ago'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}

type Checked = DropdownMenuCheckboxItemProps['checked']

const DropDownTest = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const InputTest = () => {
  const [name, setName] = useState('Mike')
  return (
    <div>
      <Label htmlFor="test-input" className="pl-2">
        Name
      </Label>
      <Input
        id="test-input"
        type="email"
        placeholder="Email"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p className="p-2">My name is {name}</p>
    </div>
  )
}

const SwitchTest = () => {
  const [color, setColor] = useState('text-red  -400')
  return (
    <div className={cn('flex items-center space-x-2', color)}>
      <Switch
        className={
          'data-[state=checked]:border-blue-700 data-[state=unchecked]:border-red-700 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-red-500'
        }
        id="airplane-mode"
        onCheckedChange={(isChecked) => {
          setColor(isChecked ? 'text-blue-400' : 'text-red-400')
        }}
      />
      <Label htmlFor="airplane-mode">Color</Label>
    </div>
  )
}

const TabsTest = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Mike" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="Mike" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here !</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const ToastTest = () => {
  const { toast } = useToast()
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Notice: Call GG ',
          description: 'You weekly call to GG is now, down forget',
          action: (
            <ToastAction altText="Goto schedule to undo">Done</ToastAction>
          )
        })
      }}
    >
      Get notification
    </Button>
  )
}

const DrawerTest = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="h-screen w-full bg-white p-6 shadow-lg"
        onClick={() => closeDrawer()}
      >
        <p>It works</p>
      </DrawerContent>
    </Drawer>
  )
}

export default UiComponentTest
