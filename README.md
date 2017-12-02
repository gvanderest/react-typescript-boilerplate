# React TypeScript Boilerplate

This is an attempt at facilitating the starting of a new project with the
following features:

* ReactJS
* TypeScript
* TSLint - Fairly strict rules


## Getting Started

Make a copy of this repository to your new project's code folder and install
its dependencies.

```
git clone git@github.com:gvanderest/react-typescript-boilerplate.git <project>
cd <project>
yarn  # or npm install
```

## Local Development

Run the local dev server, which uses webpack-dev-server.

```
yarn local
```

Then browse to the following address: http://localhost:8080/
If you need hot reloading: http://localhost:8080/webpack-dev-server/


## Local Release Testing

Run the local dev server, with all minification/optimization turned on.

NOTE: This is extremely slow, as it processes heavily for performance/minification.

```
yarn localprod
```

Then browse to the following address: http://localhost:8080/
If you need hot reloading (slow): http://localhost:8080/webpack-dev-server/


## Build a Release

Run the scripts to generate all the files needed for a release.

```
yarn release
```

All of the files will be available in the `/release/` folder, which can then
be copied elsewhere, or a simple webserver can be used to serve this folder.


## Planned Future Expansions

Add support for a few extra features:

* Jest testing
* Bundle analysis
* Minified vs Non-Minified
* Sourcemaps
* Less/Sass/CSS Compilation
* Service Worker support
