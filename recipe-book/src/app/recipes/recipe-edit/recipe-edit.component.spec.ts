import { TestBed, async } from '@angular/core/testing';
import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipeEditComponent } from './recipe-edit.component';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

export const firebaseConfig = {
  apiKey: "AIzaSyCorxRT34mMEGzkdVzGY5yQW1nwzyqWvOQ",
  authDomain: "ng-recipe-book-209c7.firebaseapp.com",
  databaseURL: "https://ng-recipe-book-209c7.firebaseio.com/",
  storageBucket: "ng-recipe-book-209c7.appspot.com",
  messagingSenderId: "1058994077874"
};

describe('Recipe Edit Component', () => {


  let fixture;
  let app;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        RecipeEditComponent
      ],
      providers: [
        AuthService, DataStorageService, RecipeService, ShoppingListService
      ]


    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    app = fixture.debugElement.componentInstance;
    app.ngOnInit();

  }));

  it('should create the component "recipe edit"', async(() => {
    expect(app).toBeTruthy();
  }));


  /** ----------
  Init tests
  ----------  */

  it('should initially have an empty name', async(() => {
    expect(app.editmode === false);
    expect(app.recipeForm.recipeName === "");
  }));

  it('should initially have no ingredients', async(() => {
    expect(app.editmode === false);
    expect(app.recipeForm.controls['ingredients'].length === 0);
  }));


  /** ----------
  Form tests
  ----------  */

  it('blank form should be invalid', () => {
    expect(app.recipeForm.valid).toBeFalsy();
  });

  it('blank name in form should be invalid', () => {
    let errors = {};
    let recipeName = app.recipeForm.controls['name'];

    errors = recipeName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should add ingredients to the list when added', () => {
    app.onAddIngredient();
    app.onAddIngredient();

    expect(app.recipeForm.controls['ingredients'].length === 2);
  });

  it('should delete ingredients from the list when deleted', () => {
    app.onDeleteIngredient(1);

    expect(app.recipeForm.controls['ingredients'].length === 1);
  });

  // it('should be able to edit the recipe and save the changes', () => {
  //
  //   firebase.initializeApp(firebaseConfig); //<-- where the magic happens
  //   //app.authService.token = "NJn6kJuxDhUVjqhnChBAiqwRK0y1";
  //   app.authService.signinUser("test@t.com", "test@t.com");
  //
  // 
  //   let form = app.recipeForm;
  //
  //   form.controls["name"] = "testName";
  //   form.controls["description"] = "testDesc";
  //   form.controls["imagePath"] =  "testPath";
  //   form.controls["ingredients"] = [];
  //
  //
  //   console.log(app.recipeService.getRecipes());
  //
  //   // form should be valid now
  //   expect(form.valid).toBeTruthy();
  //   console.log(form);
  //   app.onSubmit();
  //
  //   console.log(app.recipeService.getRecipes());
  //   expect(app.recipeService.getRecipes().length === 1);
  // });



});
