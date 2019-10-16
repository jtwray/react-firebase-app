This is a project built with React and Firebase. It's designed as a starting point of building web applications requires authentication.

### `src/components/auth/firebase-config.json`

Create the firebase configuration json file as `src/components/auth/firebase-config.json`

```json
{
    "config":{
        "apiKey": "...",
        "authDomain": "...",
        "databaseURL": "...",
        "projectId": "...",
        "storageBucket": "...",
        "messagingSenderId": "...",
        "appId": "..."
    }
}
```

### `npm install`

Install dependencies that are described in `package.json` file.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `firebase serve`

Test the project in local firebase environment.

### `firebase deploy`

Deploy the project to firebase hosting.

