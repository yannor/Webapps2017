import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;


  constructor(private authService: AuthService) {

  }
  ngOnInit() {
  }


  isYours() {
    if (this.authService.getSignedInUser() !== null) {
      if (this.authService.getSignedInUser() === this.recipe.owner) {
        return true;
      }
      return false;
    }
    else { return false; }
  }
}
