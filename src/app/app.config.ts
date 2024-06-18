import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {provideFirebaseApp, initializeApp} from "@angular/fire/app";
import {provideFirestore, getFirestore} from "@angular/fire/firestore";
import {firebaseConfig} from "../../firebaseConfig";
import {provideAnimations} from "@angular/platform-browser/animations";


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withComponentInputBinding()), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideFirestore(() => getFirestore()), provideAnimations()]
};

