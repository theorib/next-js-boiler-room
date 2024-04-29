import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';

import renderAsync from '@/testUtils/renderServerComponents';

import RootLayout from '@/app/layout';
import PageSyncServerComponent from '@/app/page-sync-server-component/page';
import PageClientComponent from '@/app/page-client-component/page';
import PageAsyncServerComponentWithChildren from '@/app/page-async-server-component-with-children/page';
import PageAsyncServerComponent from '@/app/page-async-server-component/page';

describe('Components with native Render', () => {
  test('MockPageAsyncChildAsync', async () => {
    render(
      <Suspense>
        <RootLayout>
          <PageAsyncServerComponentWithChildren />
        </RootLayout>
      </Suspense>,
    );

    const headingOne = await screen.findByRole('heading', {
      name: /PageAsyncServerComponentWithChildren/i,
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
    await renderAsync(
      <Suspense>
        <PageAsyncServerComponentWithChildren />
      </Suspense>,
    );

    const heading = await screen.findByRole('heading', {
      name: /PageAsyncServerComponentWithChildren/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('PageSyncServerComponent', () => {
    render(<PageSyncServerComponent />);
    const heading = screen.getByRole('heading', {
      name: /PageSyncServerComponent/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('PageAsyncServerComponent with a different syntax', async () => {
    const results = await PageAsyncServerComponent();
    render(results);
    const heading = screen.getByRole('heading', {
      name: /PageAsyncServerComponent/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('PageClientComponent', async () => {
    render(<PageClientComponent />);
    const heading = screen.getByRole('heading', {
      name: /PageClientComponent/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe('Testing components with custom renderAsync function', () => {
  test('PageAsyncServerComponentWithChildren', async () => {
    await renderAsync(
      <Suspense>
        <PageAsyncServerComponentWithChildren />
      </Suspense>,
    );

    const heading = await screen.findByRole('heading', {
      name: /PageAsyncServerComponentWithChildren/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('PageSyncServerComponent', async () => {
    await renderAsync(<PageSyncServerComponent />);

    const heading = screen.getByRole('heading', {
      name: /PageSyncServerComponent/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('PageAsyncServerComponent', async () => {
    await renderAsync(<PageAsyncServerComponent />);

    const heading = screen.getByRole('heading', {
      name: /PageAsyncServerComponent/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('RootLayout', async () => {
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
