# React TypeScript Boilerplate

This is an attempt at facilitating the starting of a new project with the
following features:

* ReactJS
* TypeScript
* TSLint - Fairly strict rules
* Less
* Stylus

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
        images/
            exodus-logo.png
        static/
            index.html
        styles/
            reset.css
            styles.styl
        application.tsx
```

Under the `src` folder you will find the `application.tsx` file which is the main driver of the entire project.  The `static` folder inside contains all of the static assets that will be copied directly to the root folder of the webserver when building or running the local webserver.

## Local Development

Run the local dev server, which uses webpack-dev-server.

```shell
yarn local
```

Then browse to the following address: http://localhost:8080/

If you need hot reloading: http://localhost:8080/webpack-dev-server/


## Local Release Testing

Run the local dev server, with all minification/optimization turned on.

NOTE: This is extremely slow, as it processes heavily for performance/minification.

```shell
yarn localprod
```

Then browse to the following address: http://localhost:8080/

If you need hot reloading (slow): http://localhost:8080/webpack-dev-server/

## Build a Release

Run the scripts to generate all the files needed for a release.

```shell
yarn release
```

All of the files will be available in the `/release/` folder, which can then
be copied elsewhere, or a simple webserver can be used to serve this folder.

## Planned Future Expansions

Add support for a few extra features:

* Redux/Thunk Boilerplate
* Service Worker support
