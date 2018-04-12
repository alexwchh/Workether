import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[];//Add a heroes property to the class that exposes these heroes for binding.
  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  
  constructor(private heroService:HeroService) {


   }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
  this.heroService.getHeroes().
  subscribe(heroes => this.heroes=heroes);//heroes 是getHeroes的返回值

  }

}
