export default function ErrorPage() {
  return (
    <div className="bg-[url('/gemini-generated-background.png')] bg-cover bg-center h-[75vh] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10  bg-backDropPink p-8 text-lg rounded shadow-lg flex flex-col">
        <p>Sorry, something went wrong. TBA</p>
      </div>
    </div>
  );
}
