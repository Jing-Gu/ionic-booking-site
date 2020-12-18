import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service'
import { Place } from '../places.model'
@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  constructor(private placesService: PlacesService) { }
  offers: Place[]

  ngOnInit() {
    this.offers = this.placesService.places
  }

}
