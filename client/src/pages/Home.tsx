export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-60px)] text-white flex justify-center items-center flex-col gap-3">
      <h1 style={{fontSize:"2em"}} className="text-6x1 font-bold text-center">Online Compiler</h1>
      <p className="text-gray-500 text-center">
        Compiler for HTML, CSS and JavaScript with live preview.
      </p>
    </div>
  );
}
