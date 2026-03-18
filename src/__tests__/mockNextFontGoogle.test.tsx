import { describe, test, expect } from 'vitest'
import { render } from 'vitest-browser-react'
import mockNextFontGoogle from '@/testUtils/mockNextFontGoogle'

vi.mock('next/font/google', () => mockNextFontGoogle(['Raleway']))

import { raleway } from '@/lib/fonts'

function FontConsumer() {
  return <div className={raleway.className}>Font test</div>
}

describe('mockNextFontGoogle', () => {
  test('provides a mocked font with className, style, and variable', () => {
    expect(raleway.className).toBe('mocked-raleway-class-name')
    expect(raleway.variable).toBe('--font-raleway')
    expect(raleway.style).toEqual({
      fontFamily: 'mocked-raleway-font-family',
      fontStyle: 'normal',
    })
  })

  test('renders a component using the mocked font', async () => {
    const screen = await render(<FontConsumer />)
    const el = screen.getByText('Font test')
    await expect.element(el).toBeVisible()
    await expect.element(el).toHaveClass('mocked-raleway-class-name')
  })
})
