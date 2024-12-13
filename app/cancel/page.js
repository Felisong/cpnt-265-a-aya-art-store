export default function Cancel() {
  return (
    <div className="bg-[url('/gemini-generated-background.png')] bg-cover bg-center h-[75vh] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10  bg-backDropPink p-8 text-lg rounded shadow-lg flex flex-col w-4/5 md:w-2/3">
        <h1 className="text-5xl md:text-6xl">Payment Canceled</h1>
        <p>The payment was canceled out of.</p>
      </div>
    </div>
  );
}
