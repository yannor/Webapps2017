import { Injectable } from '@angular/core'
import { HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }


// met httpParams gewerkt om te tonen hoe dit werkt
  storeRecipes() {
      const token = this.authService.getToken();
    return this.httpClient.put("https://ng-recipe-book-209c7.firebaseio.com/recipes.json", this.recipeService.getRecipes(), {
      observe: "body",
      params: new HttpParams().set("auth", token)
    });
// Om aan te tonen hoe dit werkt (goed voor bij uploaden of downloaden), imports zijn niet gedaan
    // const req = new HttpRequest("PUT", "https://ng-recipe-book-209c7.firebaseio.com/recipes.json", this.recipeService.getRecipes(),
    //   {reportProgress: true, params: new HttpParams().set("auth", token)})

    //this.httpClient.request(req);
  }


  getRecipes() {
    // this.httpClient.get<Recipe[]>("https://ng-recipe-book-209c7.firebaseio.com/recipes.json?auth="+token)
    this.httpClient.get<Recipe[]>("https://ng-recipe-book-209c7.firebaseio.com/recipes.json", {
    observe: "body",
    responseType: "json"
  })
    .map(
      (recipes) => {
          // als recipe in db geen ingredients heeft, zorg dan dat het een lege lijst met ingredients heeft
          for(let recipe of recipes) {
            if(!recipe["ingredients"]) {
              recipe["ingredients"] = [];
            }
          }
          return recipes;
      }
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
