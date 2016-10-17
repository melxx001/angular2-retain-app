import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

const heroTemp: Hero = {
  id: 1,
  name: 'Windstorm2'
};

@Component({
  selector: 'my-heroes',
  template: `
        <h2>{{heroTemp.name}} Details:</h2>
        <div><label>id: </label>{{heroTemp.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="heroTemp.name" placeholder="name">
        </div>
        <div>
            <h2>My Heroes</h2>
            <ul class="heroes">
                <li 
                    *ngFor="let x of heroes"
                    [class.selected]="x === selectedHero"
                    (click)="onSelect(x)"
                >
                    <span class="badge">{{x.id}}</span> {{x.name}}
                </li>
            </ul>
            
            <my-hero-detail [hero]="selectedHero"></my-hero-detail>
        </div>
      `,
      styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
})
export class HeroesComponent implements OnInit {
    
    heroTemp = heroTemp;
    heroes: Array<Hero>;
    selectedHero: Hero = {};

    constructor(private heroService: HeroService) { }
    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(value: Hero): void {
        this.selectedHero = value;
    }
}