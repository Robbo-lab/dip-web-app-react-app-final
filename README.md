# React app: development and deployment

This directory is the standalone app. Run all commands here; `my-react-app` is
not required. Commit `package.json` and `package-lock.json` together.

Use Node.js 22 or newer (CI uses Node 22).

```sh
npm ci
npm run dev
```

Development runs at http://localhost:3000 with browser routes and refresh support.
`npm start` is an alias for the same development server.

```sh
npm run lint
npm run build
```

The production build is written to `dist/`. Its asset path comes from `homepage`
in `package.json`, currently `/dip-web-app-react-app-final/`. Production uses hash
routes, for example `/dip-web-app-react-app-final/#/people/1`, so GitHub Pages can
serve direct links and refreshes without server rewrite rules. Local development
uses `/people/1`.

To build for a domain root or another hosting path, override the asset path:

```sh
PUBLIC_URL=/ npm run build
```

Pushes to `main` or `master` run the GitHub Actions workflow: install from the
lockfile, lint, build, and publish `dist` to the `gh-pages` branch. Configure
GitHub Pages to serve that branch's root. Alternatively, run `npm run deploy`
locally with Git credentials for this repository; it lints and builds before
publishing. Neither `npm start` nor `npm run build` publishes the site.

## NASA API configuration

Without configuration, the app uses NASA's rate-limited `DEMO_KEY`. Supply your
own key through the build environment (or the development server environment):

```sh
NASA_API_KEY=your_key npm run dev
NASA_API_KEY=your_key npm run build
```

For Actions, set the repository secret `NASA_API_KEY`. The value is embedded in
the browser bundle and is visible to visitors; it is not a server-side secret.
The previously hard-coded key should be rotated if it belongs to you. `.env`
files are not automatically loaded.

## Consolidation decisions

- Adopted the React 19.2, React Router 7 and Bulma 1.0.4 version ranges from
  `my-react-app`, with React and React DOM kept aligned.
- Added its manual deployment and lint commands, plus a `dev` alias.
- Kept only UI libraries in `dependencies`. Build, lint and deployment tools
  belong in `devDependencies`; install those before building for deployment.
- Declared ESLint's directly imported `@eslint/js` and `globals` packages.
  Used CommonJS configuration to match the existing Webpack setup.
- Removed unused `copy-webpack-plugin` and `dotenv`, and the placeholder failing
  test command. No automated application test suite exists yet.
- Added a lockfile to commit for reproducible `npm ci` installs.
- Fixed the missing person-detail route and React import in the error page,
  enabled the existing context lookup in `ThirdComponent`,
  and standardized router imports on the declared `react-router-dom` package.

Lint errors fail deployment. Existing unused-variable and effect-dependency
warnings in teaching examples remain warnings for later cleanup.

## Remaining review findings

- The APOD page does not check `response.ok`, so API errors may be treated as
  successful data. This needs a separate API error-handling change.
- The production bundle triggers Webpack size warnings (about 971 KiB).
- Installation audit reports seven development-tool dependency advisories
  (five high, two moderate) through `webpack-dev-server` 5. The suggested fix
  is a major upgrade to version 6; that upgrade is outside this consolidation.
- Lint reports unused variables in existing teaching examples.
