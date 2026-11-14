import { useState, useEffect } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // If the user types again before the delay ends, cancel the old timer
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}