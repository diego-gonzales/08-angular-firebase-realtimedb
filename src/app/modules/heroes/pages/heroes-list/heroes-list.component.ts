import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes-response.interface';
import { sweetalertConfirmMessage } from 'src/app/shared/helpers/sweetalert.helper';
import { showSweetAlertLoading, closeSweetAlertLoading } from '../../../../shared/helpers/sweetalert.helper';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

  heroes: Hero[] = [];
  isLoading: boolean = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.isLoading = true;
    this.heroesService.getHeroes()
        .subscribe(resp => {
          console.log(resp);
          this.heroes = resp;
          this.isLoading = false;
        });
  };

  async deleteHero(heroIndex: number, heroID: string) {
    const result = await sweetalertConfirmMessage();
    if (result.isConfirmed) {
      showSweetAlertLoading('Removing hero...');
      this.heroesService.deleteHero(heroID)
          .subscribe(() => {
            this.heroes.splice(heroIndex, 1);
            closeSweetAlertLoading();
          });
    };
  };
}
