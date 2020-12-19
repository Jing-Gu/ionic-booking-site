import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ModalController, NavController } from '@ionic/angular'
import { Place } from '../../places.model'
import { PlacesService } from '../../places.service'
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component'
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/discover')
        return
      }
      this.place = this.placesService.getCurrentPlace(paramMap.get('placeId'))
    })
  }

  onBookPlace(){
    this.modalCtrl
      .create({ component: CreateBookingComponent, 
                componentProps: {selectedPlace: this.place}})
      .then(modalEl => {
        modalEl.present()
        return modalEl.onDidDismiss()
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role)
        if(resultData.role === 'confirm'){
          console.log('Boooked')
        }
      })
  }

}
