"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Home() {
  const router = useRouter();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push("/exam");
  };

  return (
    <form
      className="flex flex-col gap-20 items-center mt-40"
      onSubmit={handleOnSubmit}
    >
      <Input
        required
        type="password"
        placeholder="Write your API key..."
        className="w-fit"
      ></Input>
      <Input required type="file" className="w-fit"></Input>
      <Button className="hover:scale-125 transition duration-200 bg-neutral-950">
        Go to exam!
      </Button>
    </form>
  );
}
