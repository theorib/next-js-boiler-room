import { expect, test, describe } from 'vitest';
import { page, userEvent } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';

import HomePage from '@/app/page';
import { Suspense } from 'react';

describe('Temp Test', () => {
  test('Home Page Temp', async () => {
    const screen = render(
      <Suspense>
        <HomePage />
      </Suspense>,
    );
    const img = await screen.getByRole('heading', {
      name: 'I am the home page',
    });
    await expect.element(img).toBeInTheDocument();

    const btn = await page.getByRole('button', { name: 'Click Me' });
    const counter = await page.getByText('Counter: 0');
    await expect.element(btn).toBeInTheDocument();
    await expect.element(counter).toBeInTheDocument();

    await userEvent.click(btn);
    // console.log(await screen.container.innerHTML);

    await expect.element(page.getByText('Counter: 1')).toBeInTheDocument();

    await userEvent.click(btn);

    await expect
      .element(page.getByText('Counter: 2'))
      .toHaveTextContent('Counter: 2');
  });
});
