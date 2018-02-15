# React TypeScript Boilerplate

This is an attempt at facilitating the starting of a new project with the
following features:

* Basic Technologies
  * TypeScript
  * ReactJS
  * Redux
  * React-Router with Redux Integration
    * Options between hash and browser routing
* Styling
  * LessCSS support
  * Stylus support
  * Image importing
* Examples
  * Example Startup
  * Redux/Thunk Example
* Performance
  * Image Optimization
  * JS Minification
  * CSS Minification
* Linting
  * TSLint
* Testing
  * Jest Unit Testing

## Getting Started

Make a copy of this repository to your new project's code folder and install
its dependencies.

```shell
git clone git@github.com:gvanderest/react-typescript-boilerplate.git <project>
cd <project>
yarn  # or npm install
```

Then just start editing the `src/application.tsx` files and `src/styles/styles.styl` as you wish!

If you want to include images within your TypeScript code, simply:

```typescript
// load the image from the filesystem
const exodusLogo: string = require("./images/exodus-logo.png");

// then make use of it somewhere
return (
    <img src={ exodusLogo } alt="Exodus Media Inc." />
);
```

## Folder Structure

```text
react-typescript-boilerplate/
    src/
        components/
            Example.tsx
        ducks/
            ducks.ts
            __tests__
                ducks.tests.ts
        images/
            exodus-logo.png
        static/
            index.html
        styles/
            reset.css
            styles.styl
        application.tsx
        redux.ts
        settings.ts
```

Under the `src` folder you will find the `application.tsx` file which is the main driver of the entire project.  The `static` folder inside contains all of the static assets that will be copied directly to the root folder of the webserver when building or running the local webserver.

To get started, it will depend on which areas you want to get going with:

## Areas of Development

* Static files: Add to the `src/static` folder which will be hosted at the root directory `/` on the webserver
* Shell and Routing: `src/application.tsx`
* Components: `src/components/*.tsx`
* Redux Actions and Reducers: `src/ducks/*.ts` and `settings.ts` to integrate
* Tests: In the `__tests__` folders you should be able to find some examples:
  * TODO: Component Tests: In `src/components/__tests__` there will be some example component tests
  * Redux Tests: In `src/ducks/__tests__` there are some reducer/action tests

## Local Development

Run the local dev server, which uses webpack-dev-server.

```shell
yarn local  # for local webserver development
# or ..
yarn localprod  # for local testing of production release
```

Then browse to the following address: http://localhost:8080/

If you need hot reloading: http://localhost:8080/webpack-dev-server/

Note: If you are running the production version, it will be minifying code, which can take a lot more processing and be slow to hot reload.

If you want to analyze the bundle being generated (only available in development mode): http://localhost:8081/

## Build a Release

Run the scripts to generate all the files needed for a release.

```shell
yarn release
```

All of the files will be available in the `/release/` folder, which can then
be copied elsewhere, or a simple webserver can be used to serve this folder.

## Planned Future Expansions

Add support for a few extra features:

* Service Worker support?
* Integration with Bulma or Bootstrap frameworks
