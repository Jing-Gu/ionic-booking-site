import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Place } from '../../places.model'
import { PlacesService } from '../../places.service'

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place: Place

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private placesService: PlacesService) { }

  ngOnInit() {
    // get the latest place id, no matter the page is visiable or not
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('offerId')){
        this.navCtrl.navigateBack('/places/offer')
        return
      }
      this.place = this.placesService.getCurrentPlace(paramMap.get('offerId'))
    })
  }

}
