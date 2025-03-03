# Next Boiler Room

## Description

An opinionated boilerplate for Next.js 15.

- Front end Frameworks:
  - [Next.js v15+](https://nextjs.org/)
  - [React v19+](https://reactjs.org/)
- Styling:
  - [TailwindCSS v4+](https://tailwindcss.com/)
- Tooling:
  - [TypeScript v5.87+](https://www.typescriptlang.org/)
  - [ESLint v9+](https://eslint.org/)
  - [Prettier v3+](https://prettier.io/)
- UI Libraries:
  - [shadcn/ui](https://ui.shadcn.com/)
- Schema Validation:
  - [Zod v3.24+](https://zod.dev/)
- Testing:
  - [Vitest v3+](https://vitest.dev/)
  - [Playwright v1.5+](https://playwright.dev/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- Package Management:
  - [pnpm v10+](https://pnpm.io/)
- CI/CD:
  - [Husky v9+](https://typicode.github.io/husky/#/)
    Runs hooks before Git commits and pushes. In this repository they are used to run linting and testing before committing changes to the Main branch.
  - [Commitlint v19+](https://commitlint.js.org/#/)
    Lints commit messages so they follow [Conventional Commits](https://www.conventionalcommits.org/) standards before commiting them to the Main branch.
  - [Lint-staged v15+](https://github.com/okonet/lint-staged):
    Runs ESlint, Prettier, and TypeScript checks on staged Git files before commiting changes to the Main branch.

## Getting Started

### Prerequisites

#### Package Manager

This project uses [pnpm](https://pnpm.io/) as the package manager. If you want to use a different package manager, you will need to update the `packageManager` field in `package.json` as well as the `scripts` section in `package.json`, replacing `pnpm` and `pnpm dlx` with the appropriate commands for your package manager.

#### Node.js

### First install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

### Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Your local development server will normally be available at [http://localhost:3000](http://localhost:3000) but see the message in the terminal to double check where the host is running. Open it with your browser to see the result.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.
- `lint:fix`: Runs ESLint to check for linting errors and fixes them automatically.
- `lint:nextlint`: Runs Next.js Linting version of ESlint to check for linting errors.
- `lint:debug`: Runs ESLint to check for linting errors and prints debug information.
- `lint:inspector`: Opens ESlint [Config Inspector](https://github.com/eslint/config-inspector) in your browser. Super useful for troubleshooting eslint issues.
- `lint:debug:prettier`: runs `eslint-config-prettier` to check for conflicts between ESLint and Prettier. Also useful for debugging ESlint configuration issues.
- `typecheck`: Runs TypeScript to check for type errors.
- `test`: Runs Vitest to run tests.
- `test:coverage`: Runs Vitest to run tests and generates a coverage report.
- `test:ui`: Runs Vitest to run tests and opens the test runner in your browser.
