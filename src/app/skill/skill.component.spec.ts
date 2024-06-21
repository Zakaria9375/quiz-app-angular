import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillComponent } from './skill.component';
import { QuestionComponent } from '../question/question.component';
import { ScoreComponent } from '../score/score.component';
import { ActivatedRoute } from '@angular/router';
import {Firestore} from '@angular/fire/firestore';
import { of } from 'rxjs';
import {AngularFireModule} from "@angular/fire/compat";
import {firebaseConfig} from "../../../firebaseConfig";
import {AngularFirestore} from "@angular/fire/compat/firestore";

xdescribe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  let firestore;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'quiz-icon',
      },
    },
  };
  const mockQuizzes = [
    {
      icon: 'quiz-icon',
      title: 'Mock Quiz',
      clr: '#FFFFFF',
    },
  ];
  const mockQuizDoc = {
    question: 'What is the capital of France?',
    choices: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillComponent, QuestionComponent, ScoreComponent,AngularFireModule.initializeApp(firebaseConfig)],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        AngularFirestore,
        {
          provide: Firestore,
          useValue: {
            collection: () => ({
              valueChanges: () => of([mockQuizDoc]),
            }),
          },
        },
      ],
    }).compileComponents();
    firestore=TestBed.inject(AngularFirestore);

    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
