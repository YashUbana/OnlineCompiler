import "./pageStyles/animated-text.css"
export default function Home() {
  return (
    <div
      className="w-full h-[calc(100vh-60px)] text-white flex justify-center items-center flex-col gap-3"
      style={{
        backgroundImage: "url('/giphy.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="animated-text ">Code-Mela</h1>
      <p
        className="text-500 text-center"
        style={{
          fontSize: "1.5em",
          textShadow: "2px 2px 4px rgba(255, 255, 0, 10)",
          fontFamily: "MonoLisa, sans-serif",
        }}
      >
        Compiler for HTML, CSS, and JavaScript with live preview.
      </p>
    </div>
  );
}
