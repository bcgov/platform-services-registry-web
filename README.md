# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## How to run the project locally

- Frist, make sure the api is already running at `http://localhost:4000`. This is a required step as the front end needs to fetch the graphql schema from the API. The front end will use the graphql schema to generate form validation schema (whit the yup package). This ensures that the forms on the front end include all the fields required by the various API endpoints.

- This project requires a specific version of node. If you use the latest version of node it will fail as some of the keyclaok packages, which are required for this app will break. The requried node version is `lts/gallium` . You can change your node version by running the following in the root folder of this repository: `npx use lts/gallium`. Note the use of `npx` and **not** `npm`. It is possible that you do not have this node version installed, in which case follow the prompts to install it.

- Install all packages with `npm i`

- Execute the following command while in the root folder of this repository `npm run generate`. This will automatically fetch teh graphql shcema from the API in order to generate the frontend form schema.

- Finally, run the following `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

