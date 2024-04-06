export default async function PageAsyncServerComponent() {
  await new Promise(resolve => setTimeout(resolve, 0));

  return (
    <div>
      <h1>PageAsyncServerComponent</h1>
    </div>
  );
}
