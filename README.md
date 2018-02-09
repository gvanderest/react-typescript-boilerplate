# React TypeScript Boilerplate

This is an attempt at facilitating the starting of a new project with the
following features:

* ReactJS
* TypeScript
* TSLint - Fairly strict rules
* Less
* Stylus
* Redux/Thunk Boilerplate

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
        ducks/
            ducks.ts
        images/
            exodus-logo.png
        static/
            index.html
        styles/
            reset.css
            styles.styl
        application.tsx
        redux.ts
```

Under the `src` folder you will find the `application.tsx` file which is the main driver of the entire project.  The `static` folder inside contains all of the static assets that will be copied directly to the root folder of the webserver when building or running the local webserver.

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
