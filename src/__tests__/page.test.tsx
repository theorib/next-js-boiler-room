import { expect, test, describe } from 'vitest'
import { page, userEvent } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'

import HomePage from '@/app/page'
import { Suspense } from 'react'

describe('Temp Test', () => {
  test('Home Page Temp', async () => {
    const screen = render(
      <Suspense>
        <HomePage />
      </Suspense>,
    )
    const heading = screen.getByRole('heading', {
      name: 'I am the home page',
    })
    const img = screen.getByRole('img', {
      name: 'land of the wind',
    })
    await expect.element(heading).toBeVisible()
    await expect.element(img).toBeVisible()

    const btn = page.getByRole('button', { name: 'Click Me' })
    const counter = page.getByText('Counter: 0')
    await expect.element(btn).toBeVisible()
    await expect.element(counter).toBeVisible()

    await userEvent.click(btn)

    await expect.element(page.getByText('Counter: 1')).toBeInTheDocument()

    await userEvent.click(btn)

    await expect
      .element(page.getByText('Counter: 2'))
      .toHaveTextContent('Counter: 2')
  })
})
