import { useEffect } from "react";

export const useDebounce = (callback, ms, deps = []) => {
  useEffect(() => {
    const id = setTimeout(callback, ms);
    return () => clearTimeout(id);
  }, deps);
};

export const useEventListener = (type, listener, deps = []) => {
  return useEffect(() => {
    window.addEventListener(type, listener);
    return () => window.removeEventListener(type, listener);
  }, deps);
};

export const useScroll = (type, deps = []) => {
  useEffect(() => {
    document.body.style.overflow = type;
  }, deps);
};
