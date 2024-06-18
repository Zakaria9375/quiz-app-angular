import {
  Component,
  computed,
  signal,
  effect,
  OnInit,
  HostListener,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  isDarkTheme = signal<boolean>(false);
  imagePath = computed(() => (this.isDarkTheme() ? 'light' : 'dark'));
  windowWidth = signal<number>(750);
  imgDecorative = computed((): string => {
    const theme = this.isDarkTheme() ? 'dark' : 'light';
    const screen =
      this.windowWidth() > 768
        ? this.windowWidth() > 992
          ? 'desktop'
          : 'tablet'
        : 'mobile';
    return `images/pattern-background-${screen}-${theme}.svg`;
  });

  // Binding the signal with the checkbox
  get isDark() {
    return this.isDarkTheme();
  }

  set isDark(value: boolean) {
    this.isDarkTheme.set(value);
  }

  initTheme() {
    const storedTheme = localStorage.getItem('user-theme');
    // only if there is a stored value, and it is dark: make a change otherwise do not get involved
    if (storedTheme === 'dark') {
      this.isDarkTheme.set(true);
    }
  }

  constructor(private router: Router) {
    this.initTheme();
    effect(() => {
      localStorage.setItem('user-theme', this.isDarkTheme() ? 'dark' : 'light');
    });
  }

  ngOnInit() {
    this.windowWidth.set(window.innerWidth);
  }

  // Decorative image display based on window size
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.windowWidth.set(window.innerWidth);
  }

}
