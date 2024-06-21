import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {slidInOut} from "../common/animations";

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
  animations: [slidInOut]
})
export class ScoreComponent {}
