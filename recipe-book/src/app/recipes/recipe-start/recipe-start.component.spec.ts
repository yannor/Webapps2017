import { TestBed, async } from '@angular/core/testing';
import { RecipeStartComponent } from './recipe-start.component';


describe('Recipe Start Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeStartComponent
      ]
    }).compileComponents();
  }));

  it('should create the component "recipe start"', async(() => {
    const fixture = TestBed.createComponent(RecipeStartComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render the text in a h3 tag', async(() => {
    const fixture = TestBed.createComponent(RecipeStartComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Please select a recipe!');
  }));
});
