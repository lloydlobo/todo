/**
 * ChevronUpIcon.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {JSX.Element}
 * @sources heroicons.com | chevron-up.
 */
export function ChevronUpIcon({
  className,
}: { className?: string } = {}): JSX.Element {
  return (
    <svg
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`${className} h-6 w-6`}
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
}
