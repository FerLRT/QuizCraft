export default function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hoursString = hrs > 0 ? `${hrs} hour${hrs > 1 ? "s" : ""}` : "";
  const minutesString = mins > 0 ? `${mins} minute${mins > 1 ? "s" : ""}` : "";
  const secondsString = secs > 0 ? `${secs} second${secs > 1 ? "s" : ""}` : "";

  return [hoursString, minutesString, secondsString].filter(Boolean).join(" ");
}
