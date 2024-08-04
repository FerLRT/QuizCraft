import { AppLogoName } from "./assets/headbar_ico";

export function Header() {
  return (
    <a
      href="/"
      className="text-4xl font-bold text-white mt-5 sm:ml-5 text-center sm:text-left"
    >
      <AppLogoName></AppLogoName>
    </a>
  );
}
