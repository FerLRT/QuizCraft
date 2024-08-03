import { useState } from "react";
import { BxsLeftArrow } from "./assets/leftIcon";
import { BxsRightArrow } from "./assets/rightIcon";
import { HomeIcon } from "./icons/icons";
import { Exam } from "@/interfaces/questionInterface";

export default function Index({
  exam,
  answeredQuestions,
}: {
  exam: Exam;
  answeredQuestions: Set<string>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Close the sidebar when a link is clicked in mobile view
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div
        className={`fixed top-0 right-0 h-full lg:w-[20%] md:w-[60%] w-[80%] z-40 bg-transparent text-white transition-transform ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full md:translate-x-[calc(100%-4rem)] lg:translate-x-[calc(100%-4rem)]"
        }`}
      >
        <div className="w-full h-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute left-[-3rem] top-5 p-2 bg-transparent text-white rounded-md z-50"
          >
            {isOpen ? (
              <BxsRightArrow className="h-6 w-6" />
            ) : (
              <BxsLeftArrow className="h-6 w-6" />
            )}
          </button>
          <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden p-1 custom-scrollbar">
            {Object.keys(exam).map((key) => (
              <a
                data-index={key}
                href={`#question${key}`}
                key={key}
                onClick={handleLinkClick}
                className={`index-number p-2 border m-1 rounded-md flex justify-center items-center bg-neutral-900 ${
                  answeredQuestions.has(key)
                    ? "border-2 border-blue-500"
                    : "border-2 bg-white-500"
                } hover:bg-neutral-700`}
                style={{
                  wordBreak: "break-all",
                  width: isOpen ? "100%" : "3rem",
                }}
              >
                {isOpen ? `Question ${key}` : key}
              </a>
            ))}
            <a
              href="/"
              className="p-2 m-1 mt-auto rounded-md flex justify-center items-center duration-200 hover:scale-125 w-fit transition duration-200 text-center"
            >
              <HomeIcon></HomeIcon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
