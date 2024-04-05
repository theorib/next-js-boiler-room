import ClientComponent from '@/components/ClientComponent';
import ServerComponentAsyncOne from '@/components/ServerComponentAsyncOne';

export default async function MockPageAsyncChildAsync() {
  // const portfolio = await portfolioActions.getPortfolioItems();

  return (
    <>
      <h1>MockPageAsyncChildAsync</h1>
      <ClientComponent />
      <ServerComponentAsyncOne />
    </>
  );
}
