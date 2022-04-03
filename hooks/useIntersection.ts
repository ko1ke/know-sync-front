import { useState, useEffect } from 'react';

const useIntersection = (ref: React.MutableRefObject<HTMLDivElement>) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return () => {};

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    let observerRefCurrent: HTMLDivElement | null = null;
    if (ref.current) {
      // start observation
      observer.observe(ref.current);
      observerRefCurrent = ref.current;
    }

    if (observerRefCurrent) {
      return () => {
        // end observation
        observer.unobserve(observerRefCurrent as HTMLDivElement);
      };
    }
    return () => {};
  });

  return intersecting;
};

export default useIntersection;
