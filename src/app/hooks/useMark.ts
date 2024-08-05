import { useEffect } from "react";

export default function useMark(isSubmit: boolean, mark: number) {
  useEffect(() => {
    if (isSubmit) {
      const markElement = document.getElementById("mark");
      if (markElement) {
        markElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isSubmit, mark]);
}
