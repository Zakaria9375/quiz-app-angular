import {Component, computed, effect, signal} from '@angular/core';
import { Quiz } from '../model/quiz.interface';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { quizzes } from '../model/quizzes';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { ScoreComponent } from '../score/score.component';
import {QuizDoc} from "../model/quizDoc.interface";

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [
    QuestionComponent,
    ScoreComponent,
    RouterOutlet,
  ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css',
})
export class SkillComponent {
  completed: boolean = false;

  items: QuizDoc[] = [];
  quiz: Quiz;
  currentQuestion?: QuizDoc;

  total = signal<number>(0);
  currentIdx = signal<number>(0);
  progress = computed(()=> (this.currentIdx() + 1) * 100/ this.total())
  faults = signal<number>(0)
  score  = computed(()=> this.total() - this.faults() );

  constructor(private route: ActivatedRoute, private firestore :Firestore) {
    const quizSlug = this.route.snapshot.paramMap.get('slug');
    this.quiz = quizzes.find((quiz) => quizSlug === quiz.icon) ?? quizzes[0];
    const itemCollection = collection(this.firestore, this.quiz.title);
    const items$ =  collectionData<QuizDoc[]>(itemCollection);
    items$.subscribe((items : QuizDoc[]) => {
      this.items = items
      this.total.set(items.length);
      this.faults.set(items.length)
      this.currentQuestion = items[0];
    })
    effect(()=> this.currentQuestion = this.items[this.currentIdx()])
  }

  OnNext(isCorrect: boolean) {
    isCorrect ? this.faults.update(val => val - 1 ) : null
    ;
    if(this.currentIdx() < this.total() - 1) {
      this.currentIdx.update(val => val + 1)
    } else {
      this.completed = true
    }
  }
}
