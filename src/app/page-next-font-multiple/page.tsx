import { Rubik_Scribble, Lobster, Audiowide } from 'next/font/google';

const rubik = Rubik_Scribble({ weight: '400', subsets: ['latin'] });
const lobster = Lobster({ weight: '400', subsets: ['latin'] });
const audiowide = Audiowide({ weight: '400', subsets: ['latin'] });

export default function PageNextFontMultiple() {
  return (
    <div className="space-y-5">
      <h1 className={`${rubik.className} text-5xl`}>PageNextFontMultiple</h1>
      <p className={`${lobster.className} text-5xl`}>Lobster Font</p>
      <p className={`${audiowide.className} text-5xl`}>Audiowide Font</p>
    </div>
  );
}
