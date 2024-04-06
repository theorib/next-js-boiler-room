import Image from 'next/image';
import image from '../../../public/img/TR_2019_008_000504_LeicaQ_Web.jpg';
export default async function PageNextImageSingle() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return (
    <>
      <h1>PageNextImageSingle</h1>
      <Image src={image} alt="PageNextImageSingle" />
    </>
  );
}
