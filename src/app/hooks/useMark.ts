import { useEffect } from "react";

export default function useMark(isSubmit, mark) {
  useEffect(() => {
    if (isSubmit) {
      const markElement = document.getElementById("mark");
      if (markElement) {
        markElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isSubmit, mark]);
}
