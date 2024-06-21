import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {skillMatcher} from "./common/skillMatcher";
import {skillTitleStrategy} from "./common/titleStrategy";

export const routes: Routes = [

  {
    matcher:skillMatcher,
    loadComponent: () =>
      import('./skill/skill.component').then((c) => c.SkillComponent),
    title: skillTitleStrategy
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Frontend Quiz | Home'
  },
  {
    path: '**',
    title: 'Frontend Quiz | Not Found',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
