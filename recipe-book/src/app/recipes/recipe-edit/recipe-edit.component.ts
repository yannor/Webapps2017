import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from '../../shared/data-storage.service';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              "name": new FormControl(ingredient.name, Validators.required),
              "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients": recipeIngredients
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["ingredients"]);

      const recipe = this.recipeForm.value;
      recipe.owner = this.authService.getSignedInUser();
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe)
    } else {
      this.recipeService.addRecipe(recipe);
    }

    // na het submitten wordt dit opgeslaan op firebase
    this.saveRecipesData();

    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }


// nodig voor fix bij builden
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  saveRecipesData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response) => { console.log(response);
      }
    );
  }
}
