import ClientComponent from '@/components/ClientComponent';
import ServerComponentAsyncOne from '@/components/ServerComponentAsyncOne';

export default async function PageAsyncServerComponentWithChildren() {
  // const portfolio = await portfolioActions.getPortfolioItems();

  return (
    <>
      <h1>PageAsyncServerComponentWithChildren</h1>
      <ClientComponent />
      <ServerComponentAsyncOne />
    </>
  );
}
