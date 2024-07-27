export default function removeColors(item: HTMLElement) {
  if (item.classList.contains("correct")) item.classList.remove("correct");
  else if (item.classList.contains("incorrect"))
    item.classList.remove("incorrect");
  else if (item.classList.contains("unchecked"))
    item.classList.remove("unchecked");
}
