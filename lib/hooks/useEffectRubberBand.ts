import { useEffect } from "react";

export function useEffectRubberBand(
  refLetter: React.MutableRefObject<HTMLElement | null>
) {
  useEffect(() => {
    const letter = refLetter.current;
    rubberBand(letter);
    return () => {
      if (letter) removeListenerResetStyle(letter);
    };
  }, [refLetter]);
}

function rubberBand(currentRef: HTMLElement | null) {
  if (currentRef)
    currentRef.addEventListener("mouseenter", () => {
      const r = currentRef.style;
      r.scale = "1.5";
      currentRef.classList.add("animate-rubber");
      setTimeout(() => {
        currentRef.classList.remove("animate-rubber");
        r.scale = "1";
      }, 100);
    });
}

const removeListenerResetStyle = (letter: HTMLElement) => {
  letter.removeEventListener("animationend", () => {
    letter.style.scale = "1";
  });
};
