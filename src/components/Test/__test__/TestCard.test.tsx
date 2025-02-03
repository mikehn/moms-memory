import { render, screen } from '@testing-library/react'
import TestCardGrid from '../TestCardGrid.component'

describe('TestCardGrid Component', () => {
  it('renders all children inside cards', () => {
    render(
      <TestCardGrid>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </TestCardGrid>
    )

    // Check that all children are rendered inside cards
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()

    // Check the correct number of rendered cards
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBe(3)
  })

  it('renders single compound child', () => {
    render(
      <TestCardGrid>
        <div>
          single child
          <div>sub child 1</div>
          <div>sub child 2</div>
          <div>sub child 3</div>
        </div>
      </TestCardGrid>
    )

    // Check that all children are rendered inside cards
    expect(screen.getByText('single child')).toBeInTheDocument()

    // Check the correct number of rendered cards
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBe(1)
  })

  it('applies custom column configuration', () => {
    const { container } = render(
      <TestCardGrid>
        <div>Card 1</div>
        <div>Card 2</div>
      </TestCardGrid>
    )

    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass(
      'grid-cols-2',
      'md:grid-cols-3',
      'lg:grid-cols-4'
    )
  })

  it('applies custom className to container', () => {
    const customClass = 'test-custom-class'
    const { container } = render(
      <TestCardGrid className={customClass}>
        <div>Card 1</div>
      </TestCardGrid>
    )

    const outerContainer = container.firstChild
    expect(outerContainer).toHaveClass(customClass)
  })
})
