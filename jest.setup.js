// jest.setup.js
// https://blog.jarrodwatts.com/how-to-set-up-nextjs-with-jest-react-testing-library-and-playwright
// To add some additional functionality to our Jest setup, we can utilize
// @testing-library/jest-dom's custom matchers.
// To add some additional functionality to our Jest setup, we can utilize
// @testing-library/jest-dom's custom matchers.
// setupFilesAfterEnv: ['<rootDir>/jest.setup.js']

import "@testing-library/jest-dom/extend-expect";
