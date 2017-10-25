import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
@Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Test recipe", "This is a test", "http://www.seriouseats.com/images/2016/12/20161226-staff-picks-best-recipes-2016-chicken-with-cabbage.jpg"),
    new Recipe("Test recipe 2", "This is a test", "http://www.seriouseats.com/images/2016/12/20161226-staff-picks-best-recipes-2016-chicken-with-cabbage.jpg")

  ];
  constructor() { }

  ngOnInit() {
  }

onRecipeSelected(recipe: Recipe)
{
  this.recipeWasSelected.emit(recipe);
}
}
