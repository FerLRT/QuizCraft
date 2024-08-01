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
      className="hover:scale-125 hover:bg-neutral-950 hover:rotate-[2deg] transition duration-200 bg-diagonal-gradient-inverted text-2xl border-2 border-gray-400 rounded-full"
    >
      {children}
    </Button>
  );
}
