export default async function ServerComponentAsyncTwo() {
  await new Promise(resolve => setTimeout(resolve, 0));
  return (
    <>
      <h3>ServerComponentAsyncTwo</h3>
    </>
  );
}
