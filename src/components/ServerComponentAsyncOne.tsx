import ServerComponentAsyncTwo from './ServerComponentAsyncTwo';

export default async function ServerComponentAsyncOne() {
  await new Promise(resolve => setTimeout(resolve, 0));
  return (
    <div>
      <h2>ServerComponentAsyncOne</h2>
      <ServerComponentAsyncTwo />
    </div>
  );
}
