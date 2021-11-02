import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../interfaces/heroes-response.interface';
import { HeroesService } from '../../services/heroes.service';
import { showSweetAlertLoading, closeSweetAlertLoading } from '../../../../shared/helpers/sweetalert.helper';

@Component({
  selector: 'app-heroes-manage',
  templateUrl: './heroes-manage.component.html',
  styleUrls: ['./heroes-manage.component.css']
})
export class HeroesManageComponent implements OnInit {

  myForm!: FormGroup;
  hero!: Hero;
  isAlive: boolean = true;
  isLoading: boolean = false;


  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.checkIfItsEditMode();
  };


  createForm() {
    this.myForm = this.fb.group({
      name:    [ '', [Validators.required] ],
      ability: [ '', [Validators.required] ],
      // status:  [ '', [Validators.required] ]
    });
  };

  checkIfItsEditMode() {
    if (this.router.url.includes('edit')) {
      this.isLoading = true;
      this.activatedRoute.params
          .pipe(
            switchMap(({ heroID }) => this.heroesService.getHero(heroID))
          ).subscribe(resp => {
            // Firebase doesn't send error when it doesn't find a hero (send 'null'), that's why I do this validation.
            if (!resp.name) {
              this.router.navigateByUrl('/heroes/list')
              return;
            };
            console.log(resp);
            this.hero = resp;
            this.fillFieldsToMyForm(resp);
            this.isLoading = false;
          });
    };
  };

  onSubmit() {
    const { name, ability } = this.myForm.value;

    if (this.myForm.invalid || name.trim() === '' || ability.trim() === '') {
      this.myForm.markAllAsTouched();
      return;
    };

    const hero: Hero = {
      name: name.trim(),
      ability: ability.trim(),
      isAlive: this.isAlive
    };

    (!this.hero?.id) ? this.addHero(hero) : this.editHero(hero);
  };

  fillFieldsToMyForm({ name, ability, isAlive }: Hero) {
    this.myForm.reset({ name, ability });
    this.isAlive = isAlive;
  };

  addHero(newHero: Hero) {
    showSweetAlertLoading('Creating hero...');
    this.heroesService.postHero(newHero)
        .subscribe((_) => {
          this.router.navigate(['/heroes/list']);
          closeSweetAlertLoading();
        });
  };

  editHero(editedHero: Hero) {
    showSweetAlertLoading('Updating hero...');
    this.heroesService.updateHero(editedHero, this.hero.id!)
        .subscribe((_) => {
          this.router.navigateByUrl('/heroes/list');
          closeSweetAlertLoading();
        });
  };

  fieldIsInvalid(controlName: string) {
    return this.myForm.get(controlName)?.invalid && this.myForm.get(controlName)?.touched;
  };
}
