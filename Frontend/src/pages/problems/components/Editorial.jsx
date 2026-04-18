import { useState } from "react";

const Editorial = ({ problem }) => {
    console.log(problem);
  const { ytlink, referenceSolution } = problem;

  // active language tab
  const [activeLang, setActiveLang] = useState(
    referenceSolution?.[0]?.language || ""
  );

  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">

      {/* ---------------- VIDEO SECTION ---------------- */}
      {ytlink ===""? 
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Video Editorial Comming Soon</h2>
        </div>    
      : 
      ytlink?(
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Video Editorial</h2>

          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg"
              src={ytlink.replace("watch?v=", "embed/")}
              title="Editorial Video"
              allowFullScreen
            />
          </div>
        </div>
      ):
      <>
      <div>
        No YT Link
      </div>
      </>
      }

      {/* ---------------- SOLUTION SECTION ---------------- */}
      {referenceSolution && referenceSolution.length > 0 && (
        <div>

          <h2 className="text-xl font-semibold mb-3">
            Complete Solution
          </h2>

          {/* Language Tabs */}
          <div className="flex gap-3 mb-4">
            {referenceSolution.map((sol) => (
              <button
                key={sol.language}
                onClick={() => setActiveLang(sol.language)}
                className={`px-4 py-2 rounded-md border 
                  ${activeLang === sol.language 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-[#2f2f2f]"}
                `}
              >
                {sol.language}
              </button>
            ))}
          </div>

          {/* Code Display */}
          {referenceSolution
            .filter((sol) => sol.language === activeLang)
            .map((sol) => (
              <pre
                key={sol.language}
                className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto"
              >
                <code>{sol.completeSolution}</code>
              </pre>
            ))}
        </div>
      )}
    </div>
  );
};

export default Editorial;