import { useEffect, useState } from 'react';

const useDebounce = ({ value, delay = 500 }: { value: string; delay?: number }) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;
