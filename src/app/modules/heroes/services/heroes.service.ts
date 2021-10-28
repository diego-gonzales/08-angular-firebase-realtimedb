import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hero } from '../interfaces/heroes-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseURL: string = environment.baseURLFirebase;


  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]> {
    return this.http.get(`${this._baseURL}/heroes.json`)
              .pipe(
                map((heroesObject: any) => {
                  const heroes: Hero[] = [];
                  for (const key in heroesObject) {
                    if (Object.prototype.hasOwnProperty.call(heroesObject, key)) {
                      const element: Hero = heroesObject[key];
                      element.id = key;
                      heroes.push(element);
                    };
                  };
                  return heroes;
                })
              )
  };

  getHero(heroID: string): Observable<Hero> {
    return this.http.get<Hero>(`${this._baseURL}/heroes/${heroID}.json`)
              .pipe(
                // IMPORTANT THIS PART BECAUSE FIREBASE DOESN'T RETURN 'ID'
                map(resp => ({ id: heroID, ...resp }))
              );
  };

  postHero(newHero: Hero) {
    return this.http.post(`${this._baseURL}/heroes.json`, newHero);
  };

  updateHero(editedHero: Hero, heroID: string) {
    return this.http.put(`${this._baseURL}/heroes/${heroID}.json`, editedHero);
  };
}


// Another way to mutate firebase data when we get all heroes
// const heroes: Hero[];
// Object.keys(heroesObject).forEach(key => {
//   const hero: Hero = heroesObject[key];
//   hero.id = key;
//   heroes.push(hero);
// })
