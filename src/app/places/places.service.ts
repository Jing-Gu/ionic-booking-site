import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { take, map, tap, delay } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service'
import { Place } from './places.model'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1', 
      'Swiss chalet', 
      'Come to Leysin and ski',
      'https://i.pinimg.com/originals/f1/b0/66/f1b066df0fdb3a05d81fef2e085c076b.jpg',
      249.89,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'user'
      ),
    new Place(
      'p2',
      'London tea house',
      'Drink your afternoon tea with the one',
      'https://whateveryourdose.com/wp-content/uploads/2016/12/118.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'user'
      )
  ])

  constructor(private authService: AuthService) { }

  get places(){
    return this._places.asObservable()
  }

  getCurrentPlace(currentId: string){
    return this.places.pipe(
      take(1),
      map(places => {
        return {...places.find(p => p.id === currentId)}
      })
    )
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date){
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://whateveryourdose.com/wp-content/uploads/2016/12/118.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    )

    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace))
      })
    )
  }

}
