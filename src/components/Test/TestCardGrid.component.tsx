import React, { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface CardGridProps {
  children: ReactNode
  /** Optional class names to apply to the grid container */
  className?: string
  /** Optional number of columns for different breakpoints */
  columns?: {
    small?: number
    medium?: number
    large?: number
  }
}

const TestCardGrid: React.FC<CardGridProps> = ({
  children,
  className = '',
  columns = {
    small: 1,
    medium: 2,
    large: 3
  }
}) => {
  // Generate dynamic grid classes based on columns prop
  const gridClasses = `grid grid-cols-${columns.small} md:grid-cols-${columns.medium} lg:grid-cols-${columns.large} gap-6`

  return (
    <div className="flex w-full items-center justify-center">
      <div className={`w-full space-y-6 p-4 ${className}`}>
        <div
          className="h-[calc(80vh-6rem)] overflow-auto md:h-[calc(84vh-6rem)]" // Set a max height and make it scrollable
          style={{
            scrollbarWidth: 'thin', // For Firefox
            scrollbarColor: '#d1d5db #f3f4f6' // Customize scrollbar colors
          }}
        >
          <div
            className={gridClasses}
            style={{
              scrollBehavior: 'smooth' // Smooth scrolling
            }}
          >
            {React.Children.map(children, (child, index) => (
              <Card
                key={index}
                data-testid="card"
                className="w-full overflow-hidden bg-white transition-shadow duration-300 hover:shadow-lg dark:bg-slate-800 md:w-[600px]"
              >
                <CardContent className="p-0">{child}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestCardGrid
