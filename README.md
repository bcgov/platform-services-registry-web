# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### How to run the project locally

- Frist, make sure the api is already running at http://localhost:4000 . This is a required step as the front end needs to fetch the graphql schema from the API. The front end will use the graphql schema to generate form validation schema (whit the yup package). This ensures that the forms on the front end include all the fields required by the various API endpoints.

- Execute the following command while in the root folder of this repository `npm run generate`

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

