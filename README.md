# sbweather

A trivial / not-so-trivial react app. A meditation on how all the things fit together to create a modern web app.

See it in action at [https://elovejoy5.github.io/](https://elovejoy5.github.io/sbweather/)

# Running this locally

Thanks to the magic of [Create React App](https://github.com/facebook/create-react-app), you don't have to think about webpack or babel:

- `yarn install` to populate node modules
- `yarn start` to run it on your local
- `yarn test` to run jest tests in watch mode
- `yarn build` to create a deployable build

# Good things

In addition to all the goodness of create-react-app, this app includes:

- Typescript, which helps us think more clearly about our types, and helps the IDE be much more helpful with prompts, warnings, and errors.
- Tests created with Jest and testing-library, to help you document what the app is suposed to do, and whether it is working.
- Weather forecasts from [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- UI widgets from [Material UI](https://mui.com/material-ui/getting-started/overview/)
- routing with [react-router](https://github.com/remix-run/react-router/blob/main/docs/upgrading/v5.md)

# What am I thinking

[Notes as I am building out this app](history.md)
