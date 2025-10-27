import { type RefObject, useCallback, useEffect, useState } from "react";

export function useFullscreen<T extends HTMLElement = HTMLElement>(
  targetRef?: RefObject<T>
) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = useCallback(() => {
    const el = targetRef?.current ?? document.documentElement;
    el.requestFullscreen?.();
  }, [targetRef]);

  const exitFullscreen = useCallback(() => {
    document.exitFullscreen?.();
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return { isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen };
}
