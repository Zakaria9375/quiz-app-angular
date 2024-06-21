import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {quizzes} from "../model/quizzes";


export const skillTitleStrategy: ResolveFn<string> = (route: ActivatedRouteSnapshot,   state: RouterStateSnapshot,)=> {
  const slug = route.paramMap.get('slug')
  const theQuiz = quizzes.find(quiz => quiz.icon === slug)
  return `Frontend Quiz | ${theQuiz?.title}`;
}
