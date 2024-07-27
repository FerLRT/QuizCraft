import { EXAMPLE } from "@/lib/constants";

export default function Result({ mark }) {
  return (
    <h2 className="text-white mb-20 text-3xl">
      Final Mark: {mark + " / " + Object.keys(EXAMPLE).length}
    </h2>
  );
}
