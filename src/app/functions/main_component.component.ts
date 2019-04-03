import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: './main_component.component.html',
  styleUrls: ['./main_component.component.css']
})

export class MainComponent implements OnInit {
  displayDialog: boolean;
  first: number;
  pokemonsPerPage: number;
  pokemons: any;
  selectedPokemon: any;
  selectedRow: any;
  selectedIndex: any;
  activePage: any;
  pokemonId: string;
  stat: { base_stat: number, effort: number, stat: {name: string, url: string}};
  allPokemons: any;
  showPokemon = false;

  constructor(public rest:RestService, private route: ActivatedRoute,) {
      this.initValues();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != 0) {
      this.getPokemon(id.toString());
      this.pokemonId = id.toString();
    } 
    this.getPList(0, this.showPokemon);    
  }

  getPList(_page: number, _showpokemon: boolean) {
    this.rest.getPokemonsList(this.pokemonsPerPage, _page).subscribe( (data: {} ) => {
      this.pokemons = data;
      if (_showpokemon) {
        try {
          this.selectedRow = this.pokemons.results[this.selectedIndex];
          this.onRowSelect(this.selectedRow.name, this.selectedIndex);
        } catch {
          this.initValues();
          this.getPList(0, this.showPokemon);
        };
      }
    });
  }

  onPageChg(_e: any) {
    this.activePage = _e.page;
    this.getPList (_e.page * this.pokemonsPerPage, this.showPokemon);
  }

  getPokemon(_id: string) {
    this.rest.getPokemonDetails(_id).subscribe((data: {}) => {
      this.selectedPokemon = data;
    }); 
  }

  onSearch() {

    this.rest.getPokemonsList(this.pokemons.count, 0).subscribe((data: {}) => {
      var val = 'https://pokeapi.co/api/v2/pokemon/'+this.pokemonId+'/'
      var pokemons_array = Object.assign([], data['results']);

      var indx = pokemons_array.findIndex(function(_row: any, _i: number){
          return _row.url === val;
        });

      if (indx > -1) {
        this.activePage = Math.floor(indx/this.pokemonsPerPage);
        this.selectedIndex = indx - Math.floor(indx / this.pokemonsPerPage) * this.pokemonsPerPage;
        this.first = this.activePage * this.pokemonsPerPage;
      } else {
        this.displayDialog = true;
      }
      this.getPList (this.activePage * this.pokemonsPerPage, false);

    });
  }


  onNext(_direction:number) {

    this.selectedIndex+= _direction;
    if (this.activePage * this.pokemonsPerPage+this.selectedIndex+1 > this.pokemons.count) {
      this.selectedIndex-- ;
    } else {

      if (this.selectedIndex > 9 || this.selectedIndex < 0) {
        this.activePage+= _direction;
        if (this.activePage < 0 ) {
          this.activePage = 0;
          this.selectedIndex = 0;
        } else if (this.selectedIndex > 9) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex = 9;
        }
        this.first = this.activePage * this.pokemonsPerPage;
        this.getPList (this.activePage * this.pokemonsPerPage, this.showPokemon);
      }  else {
        this.selectedRow = this.pokemons.results[this.selectedIndex]
        this.onRowSelect(this.selectedRow.name, this.selectedIndex);
      }

    }

  }

  onRowSelect(_name: string, _i: number){
    this.selectedIndex = _i;
    this.pokemonId=_name;
    this.getPokemon(this.pokemonId);
    this.showPokemon = true;
  }

  initValues() {
    this.pokemonsPerPage = 10;
    this.selectedIndex = 0;
    this.activePage = 0;
    this.first = 0;
    this.selectedPokemon = null;
    this.selectedRow = null;
    this.showPokemon = false;
    this.allPokemons = new Array(0);
    this.displayDialog = false;
  }

}
