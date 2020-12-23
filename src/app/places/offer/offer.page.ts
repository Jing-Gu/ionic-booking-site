import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service'
import { Place } from '../places.model'
import { IonItemSliding } from '@ionic/angular'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit, OnDestroy {

  offers: Place[]
  private placesSub: Subscription

  constructor(private placesService: PlacesService,
              private router: Router) { }
  

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places
    })
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close()
    this.router.navigate(['/', 'places', 'offer', 'edit', offerId])
  }

  ngOnDestroy() {
    this.placesSub.unsubscribe()
  }

}
