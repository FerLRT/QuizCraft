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
      className="hover:scale-125 hover:bg-neutral-950 hover:border-neutral-950 transition duration-200 bg-neutral-900 text-2xl border border-white"
    >
      {children}
    </Button>
  );
}
