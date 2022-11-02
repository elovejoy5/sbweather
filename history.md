# create-react-app

create-react-app provides a starter app with a great deal of what is needed for modern CI

- a webpack configuration to handle local dev server and a build process
- babel, so that developers can use modern JavaScript knowing that it will be transpiled as needed into code that will work wherever you need to run it
- useful tools like TypeScript, Jest, and Testing-Library to support typing and testing

OOB create-react-app is an empty web app, so it doesn't do a whole lot yet...

[the create-react-app commit](https://github.com/elovejoy5/sbweather/commit/00f09337e3ca6f49b8e6dd50566ddce5cf9c7524) includes:

- a `public` folder for static files and assets
- a `src` folder for typescript files that will be compiled by TypeScript + Babel + Webpack (I'm fuzzy on how TypeScript and Babel play together, so this could be wrong)
- a package.json file with a mess of imports

# MVP API call & UI

An app needs to do something.

The first bit of functionality is to get the NWS forecast for Santa Barbara, and render it on the page.

[first commit](https://github.com/elovejoy5/sbweather/commit/8b13949c3e8984e10522570d92e20c7e2ed5f159) makes the API call and stores the result to a React component. There are a couple of MVP tests

[second commit](https://github.com/elovejoy5/sbweather/commit/3ace3a597dd69123a00a3465dcc2bfb284f4400f) takes a first pass at creating a user interface using Material UI components.

This app will use the Material UI to avoid reinventing the wheel and because creating complex UI components gets very labor intensive very fast.

# routing with react-router

As the app gets more functionality, it will need be necessary to navigate to different views, and maintain state in the address bar.

My understanding is that `react-router` continues to be the most popular way to handle routing with react apps. I'm not entirely happy about this, as I find react-router to be a little bit challenging to reason about, but it works very well so it will have to be good enough for now.

TODO: link to commit with routing
