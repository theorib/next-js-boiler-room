import { render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import PageNextFontSingle from '@/app/page-next-font-single/page';
import PageNextFontMultiple from '@/app/page-next-font-multiple/page';
import PageNextImageSingle from '@/app/page-next-image-single/page';
import PageNextImageMultiple from '@/app/page-next-image-multiple/page';
import PageNextLinkSingle from '@/app/page-next-link-single/page';
import PageNextLinkMultiple from '@/app/page-next-link-multiple/page';

describe('next/image', () => {
  test('Server component with Single next/image', async () => {
    render(
      <Suspense>
        <PageNextImageSingle />
      </Suspense>,
    );

    const heading = await screen.findByRole('heading', {
      name: /PageNextImageSingle/i,
    });

    const image = screen.getByRole('img', { name: /PageNextImageSingle/i });

    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('Server component with Multiple next/image', async () => {
    render(
      <Suspense>
        <PageNextImageMultiple />
      </Suspense>,
    );

    const heading = await screen.findByRole('heading', {
      name: /PageNextImageMultiple/i,
    });
    expect(heading).toBeInTheDocument();

    const imgList = screen.getAllByRole('img');
    expect(imgList).toHaveLength(8);
  });
});

describe('next/font/google', () => {
  test('NextJS Mock Font Single', () => {
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

  test('NextJS Mock Font Multiple', () => {
    render(
      <Suspense>
        <PageNextFontMultiple />
      </Suspense>,
    );
    const heading = screen.getByRole('heading', {
      name: /PageNextFontMultiple/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('mocked-rubik_scribble-class-name');
  });
});

describe('next/link', () => {
  test('next/link Single', () => {
    render(
      <Suspense>
        <PageNextLinkSingle />
      </Suspense>,
    );
    // screen.debug();
    const link = screen.getByRole('link', { name: /PageNextLinkSingle/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  test.skip('next/link Multiple', async () => {
    render(
      <Suspense>
        <PageNextLinkMultiple />
      </Suspense>,
    );
    await waitFor(()=>{
    // 
    }
    )

    const heading = screen.getByRole('heading', {
      name: /PageNextLinkMultiple/i,
    });
    expect(heading).toBeInTheDocument();

    const linkOne = screen.getByRole('link', { name: /PageNextImageSingle/i });
    expect(linkOne).toBeInTheDocument();
    expect(linkOne).toHaveAttribute('href', '/page-next-image-single');

    const linkTwo = screen.getByRole('link', {
      name: /PageNextImageMultiple/i,
    });
    expect(linkTwo).toBeInTheDocument();
    expect(linkTwo).toHaveAttribute('href', '/page-next-image-multiple');
  });
});
