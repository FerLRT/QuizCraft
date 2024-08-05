import { AppLogoName } from "./assets/headbar_ico";

export function Header() {
  return (
    <a href="/" className="mt-5 flex justify-center md:justify-start md:ml-5">
      <AppLogoName></AppLogoName>
    </a>
  );
}
