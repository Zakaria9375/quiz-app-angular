import {animate, state, style, transition, trigger} from "@angular/animations";


export const  fading =
  trigger('fade',[
    state(
      'in',
      style({
        opacity: 1,
      }),
    ),
    state(
      'out',
      style({
        opacity: 0,
      }),
    ),
    transition('void => *', [
      style({
        opacity: 0,
      }),
      animate(500),
    ]),
    transition( '* => void', [
      style({
        opacity: 1
      }),
      animate(500),
    ])
  ])

export const slidInOut = trigger('slide-in-out', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0px)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(-5px)'
    }),
    animate(300)
  ])
])
