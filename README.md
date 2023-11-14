# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Online Demo: [Click here to see the demo](https://synonyms-search-app.web.app/)

## Development Environment Setup

No matter what IDE you are using for the development, you will always get the support of prettier formatting and eslinter through the project codebase. But it is recommended to use Visual Studio Code (VSCode).

1. Install Nodejs on your machine (recommanded to install the recent version).
2. Install VSCode on your machine as an IDE.
3. Install git bash on your machine for using git through terminal.

## VSCode IDE Setup

1. Configure **VSCode IDE** according to your way.
2. Install **Prettier - Code formatter** plugin and configure the formatting on file save.
3. Install **ESLint** by Microsoft for following standard code writing convensions and identifying code issues.
4. Install **GitLens** for performing git operations using **VSCode GUI**.

## Application Credentials Setup

Add a `.env` file in the root of the project according to the `.env.example` file.

```
REACT_APP_PORT="<app-port-number>"
REACT_APP_API_URL="<backend-api-url>"
```

Replace all the `<placeholders>` with correct credentials.

## Available Scripts

Open `git bash` or any other terminal from the project root directory and follow the following steps for up and run the project.

- `npm install` (installs the application dependencies)
- `npm update` (updates the application dependencies)
- `npm start` (starts the application on your favorite browser, But before starting, it will apply prettier format and scan the whole codebase for linter issues)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

### `npm run test:watch`

Launches the test runner in the interactive watch mode.\
But before launching test runner, it will apply prettier format scan the whole codebase for linter issues.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress:open`

This command can be used for opening cypress test console on google chrome and therefore can be used for running end-to-end tests. <span style="color: red; font-weight: bold">Note:</span> Make sure to start the application in separate terminal using `npm start` before opening cypress test console.

### `npm run cypress:run`

This command can be used for opening cypress console on google chrome in headless mode and therefore can be used for running end-to-end tests. <span style="color: red; font-weight: bold">Note:</span> Make sure to start the application in separate terminal using `npm start` before running cypress tests in headless.

### `npm run lint`

This command can be used for manually run the linter to check the codebase for code smell and issues.

### `npm run lint:fix`

This command can be used for manually run the linter to check the codebase for code smell and issues. But additionally, this command will fix some potential code issues automatically.

### `npm run format`

This command can be used for manually checking prettier formatting issues on the whole codebase.

### `npm run format:fix`

This command can be used for manually applying prettier formatting on the whole codebase.

### `npm run format:lint:fix`

This command can be used for manually applying prettier formatting on the whole codebase as well as manually run the linter to check the codebase for code smell and issues. But additionally, this command will fix some potential code issues automatically.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. But before building, it will apply prettier format scan the whole codebase for linter issues.

The build is minified and the filenames include the hashes\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
