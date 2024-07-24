import { EXAMPLE } from "@/lib/constants";

export default function Index() {
  return (
    <div className="fixed flex self-end mt-20 mr-10 text-white bg-neutral-950 p-3">
      {Object.keys(EXAMPLE).map((key) => {
        return (
          <a
            data-index={key}
            href={`#question${key}`}
            key={key}
            className="p-3 border border-white m-1 hover:bg-neutral-900"
          >
            {key}
          </a>
        );
      })}
    </div>
  );
}
