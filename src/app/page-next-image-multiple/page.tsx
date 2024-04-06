import { portfolio } from '@/data/portfolio';
import Image from 'next/image';

export default async function PageNextImageMultiple() {
  const portfolioArr = portfolio;

  return (
    <>
      <h1>PageNextImageMultiple</h1>
      <ul className="w-full flex flex-wrap">
        {portfolioArr.map(image => (
          <li key={image.slug} className="w-full max-w-80 h-36 relative">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
