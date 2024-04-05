import ServerComponentAsyncOne from '@/components/ServerComponentAsyncOne';

export default async function MockPageAsyncChildAsync() {
  // const portfolio = await portfolioActions.getPortfolioItems();

  return (
    <div>
      <h1>I am MockPageAsyncChildAsync</h1>
      <ServerComponentAsyncOne />
    </div>
  );
}
