import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionComponent } from './question.component';
import {NgClass} from "@angular/common";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ComponentRef} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let componentRef: ComponentRef<QuestionComponent>
  const mockQuizDoc = {
    question: 'What is the capital of France?',
    choices: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NgClass, QuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('doc', mockQuizDoc);
    fixture.detectChanges();
  });

  it('should show an error message only if no choice is selected and submit is clicked', () => {
    component.onSubmit();
    fixture.detectChanges();
    expect(component.err).toBeTrue();
    component.selectChoice(mockQuizDoc.choices[0]);
    fixture.detectChanges();
    expect(component.err).toBeFalse()
  });

  it('should reset state on doc change', () => {
    component.selectChoice(mockQuizDoc.choices[0]);
    component.onSubmit();
    fixture.detectChanges();
    const newDoc = {
      question: 'What is the capital of Germany?',
      choices: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Berlin'
    };
    componentRef.setInput('doc', newDoc)
    fixture.detectChanges();
    expect(component.selectedChoice).toBe('');
    expect(component.err).toBeFalse();
    expect(component.isSubmitted).toBeFalse();
    expect(component.isCorrect).toBeFalse();
  });

  it('should emit next event with the correct value', () => {
    spyOn(component.next, 'emit');
    component.selectChoice(mockQuizDoc.choices[0]);
    component.onSubmit();
    component.onNext();
    expect(component.next.emit).toHaveBeenCalledWith(true);
  });

  it('should show incorrect feedback after submission', () => {
    component.selectChoice(mockQuizDoc.choices[1]);
    component.onSubmit();
    fixture.detectChanges();
    const compiled = fixture.debugElement;
    const incorrectIcon = compiled.query(By.css('img[alt="This is a Wrong answer"]'));
    expect(incorrectIcon).toBeTruthy();
  });
});
