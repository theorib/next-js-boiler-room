// import { screen } from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';
import MockPageSync from '@/app/mock-page-sync/page';
import renderAsync from '@/testUtils/renderServerComponents';
import MockPageAsync from '@/app/mock-page-async/page';
import RootLayout from '@/app/layout';
import { Suspense } from 'react';
import MockPageClient from '@/app/mock-page-client/page';
import MockPageAsyncChildAsync from '@/app/mock-page-async-child-async/page';

describe('tests with nested components', () => {
  test.skip('Test MockPageAsyncChildAsync', async () => {
    // const results = await MockPageAsyncChildAsync();
    const results = waitFor(MockPageAsyncChildAsync);
    render(results);
    // render(await MockPageAsyncChildAsync());

    // const heading = screen.getByRole('heading', {
    //   name: /i am MockPageAsyncChildAsync/i,
    // });
    // expect(heading).toBeInTheDocument();
  });
  test('Another MockPageAsync with a different syntax', async () => {
    render(
      <Suspense>
        <MockPageAsync />
      </Suspense>,
    );
    // const results = await MockPageAsync();
    // render(results);
    // const heading = screen.getByRole('heading', {
    //   name: /i am the mock page async/i,
    // });
    // expect(heading).toBeInTheDocument();
  });
});

describe('Testing native render function', () => {
  test('Test MockPageSync', () => {
    render(<MockPageSync />);
    const heading = screen.getByRole('heading', {
      name: /i am the mock page sync/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Test MockPageAsync with a different syntax', async () => {
    const results = await MockPageAsync();
    render(results);
    const heading = screen.getByRole('heading', {
      name: /i am the mock page async/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Test MockPageClient', async () => {
    render(<MockPageClient />);
    const heading = screen.getByRole('heading', {
      name: /i am the MockPageClient/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe.skip('Testing Custom Render Function', () => {
  test('Test MockPageAsyncChildAsync', async () => {
    await renderAsync(
      <Suspense>
        <MockPageAsyncChildAsync />
      </Suspense>,
    );

    // const heading = screen.getByRole('heading', {
    //   name: /i am MockPageAsyncChildAsync/i,
    // });
    // expect(heading).toBeInTheDocument();
  });

  test('Test MockPageSync', async () => {
    await renderAsync(<MockPageSync />);

    const heading = screen.getByRole('heading', {
      name: /i am the mock page sync/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Test MockPageAsync', async () => {
    await renderAsync(<MockPageAsync />);

    const heading = screen.getByRole('heading', {
      name: /i am the mock page async/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Test RootLayout', async () => {
    const { container, debug } = await render(
      <RootLayout>
        <h1>Layout</h1>
      </RootLayout>,
    );

    const heading = screen.getByRole('heading', {
      name: /layout/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

// const props = {
//   params: { surveyType: '123' },
//   searchParams: { journeyId: '456' },
// }

// const Result = await Page(props)
// render(Result)
