import { TestBed, async } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

describe('Recipes service', () => {

  let service;
  let shoppingService;
  let recipe: Recipe;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      providers: [
        RecipeService, ShoppingListService
      ]

    }).compileComponents();

    shoppingService = TestBed.get(ShoppingListService);
    service = TestBed.get(RecipeService);
    recipe = new Recipe("testName", "testDesc", "testPath", [], "testOwner");

  }));

  // GetRecipes
  it('Have 0 recipes to start with', async(() => {
    expect(service.getRecipes() === 0);
  }));

  // Add recipe
  it('Can add recipes', async(() => {
    service.addRecipe(recipe);
    expect(service.getRecipes() === 1);
  }));

  // Get recipe
  it('Can get a recipe', async(() => {
    service.addRecipe(recipe);
    expect(service.getRecipe(0).name === "testName");
  }));

  // Update recipe
  it('Can update a recipe', async(() => {
    service.addRecipe(recipe);
    expect(service.getRecipe(0).name === "testName");

    recipe.name = "newName";
    service.updateRecipe(0, recipe);
    expect(service.getRecipe(0).name === "newName");
  }));

  // Delete recipe
  it('Can delete a recipe', async(() => {
    service.addRecipe(recipe);
    expect(service.getRecipes() === 1);

    service.deleteRecipe(0);
    expect(service.getRecipes() === 0);
  }));


  // Set recipes
  it('Can set the recipes', async(() => {
    // Add some data to the list en check deze
    service.addRecipe(recipe);
    service.addRecipe(recipe);
    expect(service.getRecipe(0).name === "testName");
    expect(service.getRecipes() === 2);

    // Make a new list to replace the first one
    let newRecipeList: Recipe[] = [
    new Recipe("newName", "newDesc", "newPath", [], "newOwner"),
    new Recipe("newName", "newDesc", "newPath", [], "newOwner"),
    new Recipe("newName", "newDesc", "newPath", [], "newOwner")];


    // Check data
    service.setRecipes(newRecipeList);
    expect(service.getRecipe(0).name === "newName");
    expect(service.getRecipes() === 3);

  }));


  // Add ingredients
  it('Can add ingredients to a shopping list', async(() => {
    service.addRecipe(recipe);
    expect(service.getRecipe(0).ingredients === 0);

    // Make a new list of ingredients to add to recipe
    let ingredientList: Ingredient[] = [
    new Ingredient("appel", 1),
    new Ingredient("peer", 2),
    new Ingredient("banaan", 3)];

    service.addIngredientsToShoppingList(ingredientList);


    expect(shoppingService.getIngredients() === 3);
    expect(shoppingService.getIngredient(2).name === "peer");
    expect(shoppingService.getIngredient(3).amount === 3);
  }));




});
