// import mockNextFont from './mockNextFont';
// mockNextFont(['Rubik_Scribble', 'Inter']);

// import mockNextFontOld from '@/testUtils/mockNextFontOld';
// vi.mock(`next/font/google`, () => mockNextFontOld(['Rubik_Scribble', 'Inter']));

import RootLayout from '@/app/layout';
import PageNextFontSingle from '@/app/page-next-font-single/page';

//
import { render, screen } from '@testing-library/react';
// import { waitFor } from '@testing-library/react';
import MockPageSync from '@/app/mock-page-sync/page';
import renderAsync from '@/testUtils/renderServerComponents';
import MockPageAsync from '@/app/mock-page-async/page';
import { Suspense } from 'react';
import MockPageClient from '@/app/mock-page-client/page';
import MockPageAsyncChildAsync from '@/app/mock-page-async-child-async/page';
import PageNextImage from '@/app/page-next-image/page';
import NextLinkPage from '@/app/page-next-link/page';

beforeAll(() => {
  //
  // vi.mock(`next/font/google`, () =>
  //   mockNextFontOld(['Rubik_Scribble', 'Inter']),
  // );
});
describe.only('Testing NextJS Functions', () => {
  test.only('NextJS Mock Font Single', () => {
    render(
      <Suspense>
        <PageNextFontSingle />
      </Suspense>,
    );
    const heading = screen.getByRole('heading', {
      name: /PageNextFontSingle/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('mocked-rubik_scribble-class-name');
  });

  test('next/link', () => {
    render(
      <Suspense>
        <NextLinkPage />
      </Suspense>,
    );
    // screen.debug();
    const link = screen.getByRole('link', { name: /NextLinkPage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
  test('Server component with next/image', async () => {
    render(
      <Suspense>
        <PageNextImage />
      </Suspense>,
    );

    const heading = await screen.findByRole('heading', {
      name: /PageNextImage/i,
    });

    const image = screen.getByRole('img', { name: /theo ribeiro portrait/i });

    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});

describe('tests with nested components', () => {
  test.skip('Another MockPageAsyncChildAsync ', async () => {
    render(
      <Suspense>
        <RootLayout>
          <MockPageAsyncChildAsync />
        </RootLayout>
      </Suspense>,
    );

    const headingOne = await screen.findByRole('heading', {
      name: /MockPageAsyncChildAsync/i,
    });
    const clientComponent = screen.getByRole('heading', {
      name: /ClientComponent/i,
    });
    const serverComponentAsyncOne = screen.getByRole('heading', {
      name: /ServerComponentAsyncOne/i,
    });
    const serverComponentAsyncTwo = screen.getByRole('heading', {
      name: /ServerComponentAsyncTwo/i,
    });
    // screen.debug();
    expect(headingOne).toBeInTheDocument();
    expect(clientComponent).toBeInTheDocument();
    expect(serverComponentAsyncOne).toBeInTheDocument();
    expect(serverComponentAsyncTwo).toBeInTheDocument();
  });

  test('MockPageAsyncChildAsync with custom renderer', async () => {
    renderAsync(
      <Suspense>
        <MockPageAsyncChildAsync />
      </Suspense>,
    );

    const heading = await screen.findByRole('heading', {
      name: /MockPageAsyncChildAsync/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Test MockPageAsyncChildAsync', async () => {
    // const results = await MockPageAsyncChildAsync();
    // const results = waitFor(MockPageAsyncChildAsync);
    // render(results);
    // const heading = await screen.findByRole('heading', {
    //   name: /I am MockPageAsyncChildAsync/i,
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

describe('Testing Custom Render Function', () => {
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

  test.skip('Test RootLayout', async () => {
    await render(
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
