import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {By} from "@angular/platform-browser";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot(routes), FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    let localStore: any  = {'user-theme': 'light', 'another': 'unknown'};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in localStore  ? localStore[key] : null;
      },
      setItem: (key: string, value: string) => {
        localStore[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
  });

  // local storage user-theme getting
  it('should get theme from local storage', () => {
    app.initTheme()
    expect(localStorage.getItem('user-theme')).toEqual('light');
  });

  // local storage user-theme setting
  it('should set theme from local storage', () => {
    app.isDark = true;
    fixture.detectChanges();
    expect(localStorage.setItem).toHaveBeenCalledWith('user-theme','dark');
    app.isDark = false;
    fixture.detectChanges();
    expect(localStorage.setItem).toHaveBeenCalledWith('user-theme', 'light')
  })

  // window resizing signal
  it('should update windowWidth on resize', () => {
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));
    expect(app.windowWidth()).toBe(1024);
  })

  // toggling app theme
  it('should toggle light-dark theme', ()=>{
    const checkBox = fixture.debugElement.query(By.css('#switcher')).nativeElement;
    checkBox.checked = false;
    checkBox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(app.isDarkTheme()).toBe(false);
    expect(app.isDark).toBe(false);
    checkBox.checked = true;
    checkBox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(app.isDarkTheme()).toBe(true);
    expect(app.isDark).toBe(true);
  })
});
