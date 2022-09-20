import initializeApp from 'firebase/app';
import {getAuth} from 'firebase/auth';
require('dotenv').config;

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    appId: process.env.APP_ID
}

var app = initializeApp(firebaseConfig);
export var authentication = getAuth(app);