// import { screen } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import MockPageSync from '@/app/mock-page-sync/page';
import renderAsync from '@/testUtils/renderServerComponents';
import MockPageAsync from '@/app/mock-page-async/page';
import RootLayout from '@/app/layout';
import { Suspense } from 'react';

// const props = {
//   params: { surveyType: '123' },
//   searchParams: { journeyId: '456' },
// }

// const Result = await Page(props)
// render(Result)

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
  test.skip('Another MockPageAsync with a different syntax', async () => {
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

describe('Testing Custom Render Function', () => {
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
