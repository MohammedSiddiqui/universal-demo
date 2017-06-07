/* Allows for dynamic import usage till Typescript officially supports it
 Example: System.import('someModule') */
declare global {
  interface System {
    import (request: string): Promise<any>
  }
  var System: System
}

import { NgModule, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule, AppComponent } from './app.module';

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
