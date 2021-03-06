import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    //this.router.navigate(["../", this.id, "edit"], {relativeTo: this.route});
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }

  canManageRecipe() {
    if (this.authService.getSignedInUser() === null) {
      return false;
    }
    else {
      if (this.authService.getSignedInUser() === this.recipe.owner) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
