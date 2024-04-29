'use client';

import { useState } from 'react';

export default function PageButtonClicks() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(isClicked => !isClicked);
  };

  return (
    <>
      <h1 className="text-3xl pb-4">PageButtonClicks</h1>
      <button className="btn" onClick={handleClick}>
        {isClicked ? 'Alert Button Clicked' : 'Alert Button'}
      </button>
    </>
  );
}
