import { ReactNode, useRef } from "react";
import { useEffectRubberBand } from "../../../lib/hooks";

export function TextSpan({ children }: { children: ReactNode }): JSX.Element {
  const refLetter = useRef<null | HTMLElement>(null);
  useEffectRubberBand(refLetter);
  return (
    <>
      <span
        className="inline-block transition-all duration-500 ease-out"
        ref={refLetter}
      >
        {children}
      </span>

      <style>{styleRubberAnimation}</style>
    </>
  );
}

const styleRubberAnimation = `
        .animate-rubber {
          animation: rubber 1s infinite;
        }

        @keyframes rubber {
          0% {
            transform: scale3d(1.0, 1.0, 1.0);
            // animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          25% {
            transform: scale3d(0.80, 1.25, 1.0);
            // animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          45% {
            transform: scale3d(0.15, 1.55, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: scale3d(0.25, 1.50, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          750% {
            transform: scale3d(0.80, 1.25, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          100% {
            transform: scale3d(1.0, 1.0, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
        }
      `;
