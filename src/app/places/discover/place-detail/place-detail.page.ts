import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ActionSheetController, ModalController, NavController } from '@ionic/angular'
import { Place } from '../../places.model'
import { PlacesService } from '../../places.service'
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place: Place
  private placeSub: Subscription

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/discover')
        return
      }
      this.placeSub = this.placesService.getCurrentPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place
      })
    })
  }

  onBookPlace(){
    this.actionSheetCtrl.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select')
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEL => {
      actionSheetEL.present()
    })
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode)
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

  ngOnDestroy(){
    this.placeSub.unsubscribe()
  }
}
