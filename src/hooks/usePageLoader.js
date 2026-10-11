import { useEffect, useState } from "react";

export const LOADER_MIN_MS = 700;


export default function usePageLoader(
  isLoading = false,
  minDuration = LOADER_MIN_MS,
) {
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinElapsed(true), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  return isLoading || !minElapsed;
}
