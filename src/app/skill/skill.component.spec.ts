import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillComponent } from './skill.component';
import {QuestionComponent} from "../question/question.component";
import {ScoreComponent} from "../score/score.component";
import {Firestore} from "@angular/fire/firestore";
import {ActivatedRoute} from "@angular/router";

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  };

  const mockFirestore = {
    collection: jasmine.createSpy('collection'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillComponent, QuestionComponent, ScoreComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Firestore, useValue: mockFirestore },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
