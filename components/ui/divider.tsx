export interface DividerColor {
    color: string[];
}
const colorVariants = [
    "pink",
    "green",
    "gray1",
    "gray2",
    "gray3",
    "gray4",
    "gray5",
    "gray6",
    "gray7",
];

// const isFound = colorVariants.includes(color);
// console.log(isFound);

export function DivderPill({ className }: { className?: string }) {
    return (
        <div
            className={`mx-auto my-12  h-1 w-24 rounded-full bg-gray1 bg-gradient-to-r  ${
                className ? `${className}` : " from-gray5 to-gray4 "
            }`}
        ></div>
    );
}

/* {colorVariants.map((variant) => (color === variant) ? (
                <div
                    key={variant}
                    className={`bg-gradient-to-r from-${variant}-500 to-${variant}-400 my-12 mx-auto h-1 w-24 rounded-full`}
                />
            );
    ) : (
          <div
            className={`from-gray5-500 my-12 mx-auto h-1 w-24 rounded-full bg-gradient-to-r to-gray4`}
        />

    )} */
