import { Routes, RouterModule } from '@angular/router';
import {DataResolver} from "./data.resolver";
import {DataComponent} from "./data.component";
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {path: '',        component: HomeComponent},
  {path: 'mydata', component: DataComponent,
    resolve:{ // configure the resolve guard for mydata route
      loadedJsonData: DataResolver // specifies the class that will preload the data
    },
    runGuardsAndResolvers:'always'  // requires Angular 5.1 or later
  }
];

export const routing = RouterModule.forRoot(routes,
  {onSameUrlNavigation: "reload"}   // requires Angular 5.1 or later
  );
