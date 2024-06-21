import { NgClass } from '@angular/common';
import {Component, input, OnChanges, output, SimpleChanges} from '@angular/core';
import {QuizDoc} from "../model/quizDoc.interface";
import {fading, slidInOut} from "../common/animations";

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [NgClass],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
  animations: [fading, slidInOut]
})
export class QuestionComponent implements OnChanges {
  selectedChoice: string = '';
  isSubmitted: boolean = false;
  err: boolean = false;
  isCorrect: boolean = false;

  doc = input<QuizDoc>()
  next = output<boolean>()


  selectChoice(choice: string) {
    this.selectedChoice = choice;
    this.err = false
  }
  choiceNr(idx: number): string {
    switch (idx) {
      case 0:
        return 'a';
      case 1:
        return 'b';
      case 2:
        return 'c';
      case 3:
        return 'd';
      default:
        return 'a';
    }
  }
  onSubmit() {
    if (!this.selectedChoice) {
      this.err = true;
    } else {
      this.err = false;
      this.selectedChoice === this.doc()?.answer
        ? (this.isCorrect = true)
        : (this.isCorrect = false);
      this.isSubmitted = true;
    }
  }

  onNext() {
    //this.quizService.reCalculateScore(this.isCorrect);
    this.next.emit(this.isCorrect)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['doc']) {
      this.selectedChoice = '';
      this.err = false;
      this.isSubmitted = false;
      this.isCorrect = false;
    }
  }

  getCorrectAnswer(choice: string) {
    return this.isSubmitted && choice === this.doc()?.answer;
  }
  getSelectedInCorrectly(choice: string) {
    return (
      this.isSubmitted &&
      this.selectedChoice === choice &&
      choice !== this.doc()?.answer
    );
  }
  getSelectedClass(choice: string) {
    return choice === this.selectedChoice && !this.isSubmitted;
  }
}
