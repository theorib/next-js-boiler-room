import Link from 'next/link';

export default function PageNextLinkMultiple() {
  return (
    <>
      <h1 className="text-3xl">PageNextLinkMultiple</h1>
      <Link href={'/'} className="link">
        HomePage
      </Link>
      <Link href={'/page-next-image-single'} className="link">
        PageNextImageSingle
      </Link>
      <Link href={'/page-next-image-multiple'} className="link">
        PageNextImageMultiple
      </Link>
    </>
  );
}
