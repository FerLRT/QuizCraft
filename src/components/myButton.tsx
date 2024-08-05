import { Button } from "./ui/button";

export default function MyButton({
  handleOnClick,
  children,
}: {
  handleOnClick?: () => void;
  children: string;
}) {
  return (
    <Button
      onClick={handleOnClick}
      className="hover:scale-125 transition duration-200 bg-gradient-to-l from-zinc-800 to-zinc-900  text-2xl border-2 border-gray-400 rounded-lg"
    >
      {children}
    </Button>
  );
}
