import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { Place } from '../../places.model'
import { PlacesService } from '../../places.service'

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place
  private placeSub: Subscription

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
      
      this.placeSub = this.placesService.getCurrentPlace(paramMap.get('offerId')).subscribe(place => {
        this.place = place
      })
    })
  }

  ngOnDestroy() {
    this.placeSub.unsubscribe()
  }

}
