import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = [
  "faishon",
  "laptoptexting",
  "library",
  "nerd",
  "pizza3",
  "cheese2",
  "saturday2",
  "baskinrobbins2",
  "villa",
  "coffee",
  "tomorrow2",
  "deadpool",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "covera1",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);


  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);


  return (
    <>
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/your-large-image.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main UI Layer */}
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <a className="pointer-events-auto mt-10 ml-10">
          <img className="w-20" src="/images/gamepixellogo.png" alt="Game Pixel Logo" />
        </a>
        
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>
    </>
  );
};