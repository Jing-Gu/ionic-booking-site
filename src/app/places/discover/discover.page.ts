import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service'
import { Place } from '../places.model'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[]
  private placeSub: Subscription

  constructor(private placesService: PlacesService) { }

  ngOnInit() {  
    this.placeSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places
    })
  }

  onFilterUpdate(event: CustomEvent){
    console.log(event.detail)
  }

  ngOnDestroy() {
    this.placeSub.unsubscribe()
  }

}
