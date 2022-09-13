// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA7O5OFo_EcEzO8bTOrbFWC2-lrX1O1FCE",
  authDomain: "pomodoro-method.firebaseapp.com",
  projectId: "pomodoro-method",
  storageBucket: "pomodoro-method.appspot.com",
  messagingSenderId: "339554662270",
  appId: "1:339554662270:web:71dc34a2595cef2c50a52f",
  measurementId: "G-MTE4GJD2BL"
  },
  url: "https://us-central1-pomodoro-method.cloudfunctions.net/api"
  // url: "http://localhost:5000/pomodoro-method/us-central1/api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
