'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import landOfTheWind from 'public/img/land-of-the-wind.jpg';
import { useState } from 'react';
export default function HomePage() {
  const [count, setCount] = useState(0);
  const handleCount = () => {
    setCount(count => count + 1);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="font-raleway mb-4 text-5xl">I am the home page</h1>
      <Image
        src={landOfTheWind}
        width={720}
        height={320}
        alt="land of the wind"
        className="object-cover object-center"
        sizes="50vw"
      />
      <span className="border-2 px-6 py-3 pt-1 text-6xl">{count}</span>
      <Button onClick={handleCount}>Click Me</Button>
    </div>
  );
}
