import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service'
import { Place } from '../places.model'
import { IonItemSliding } from '@ionic/angular'
import { Router } from '@angular/router'
@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  constructor(private placesService: PlacesService,
              private router: Router) { }
  offers: Place[]

  ngOnInit() {
    this.offers = this.placesService.places
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close()
    this.router.navigate(['/', 'places', 'offer', 'edit', offerId])
  }

}
