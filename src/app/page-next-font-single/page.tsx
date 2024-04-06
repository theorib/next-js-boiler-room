import { Rubik_Scribble } from 'next/font/google';

const font = Rubik_Scribble({ weight: '400', subsets: ['latin'] });

export default function PageNextFontSingle() {
  return (
    <div>
      <h1 className={`${font.className} text-5xl`}>PageNextFontSingle</h1>
    </div>
  );
}
