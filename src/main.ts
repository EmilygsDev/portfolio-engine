
/*
 * APPLICATION ENTRY POINT
 * Architecture: Angular Standalone (Signal-ready)
 * This file handles the initialization (bootstrapping) of the root component.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

// Initialize the Angular application with the provided configuration
await bootstrapApplication(AppComponent, appConfig);
