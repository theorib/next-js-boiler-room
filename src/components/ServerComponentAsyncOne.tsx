export default async function ServerComponentAsyncOne() {
  await new Promise(resolve => setTimeout(resolve, 0));
  return (
    <div>
      <h2>I am ServerComponentAsyncOne</h2>
    </div>
  );
}
