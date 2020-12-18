import { Injectable } from '@angular/core'
import { Place } from './places.model'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    
    new Place(
      'p1', 
      'Swiss chalet', 
      'Come to Leysin and ski',
      'https://i.pinimg.com/originals/f1/b0/66/f1b066df0fdb3a05d81fef2e085c076b.jpg',
      249.89 ),
    new Place(
      'p2',
      'London tea house',
      'Drink your afternoon tea with the one',
      'https://whateveryourdose.com/wp-content/uploads/2016/12/118.jpg',
      149.99)
  ]

  constructor() { }

  get places(){
    return [...this._places]
  }

  getCurrentPlace(currentId: string){
    return {...this._places.find(p => p.id === currentId)}
    // find the place and copy by ..., won't affect the original objects
  }
}
