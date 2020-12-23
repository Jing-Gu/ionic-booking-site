import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { Place } from '../../places.model'
import { PlacesService } from '../../places.service'

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  place: Place
  editForm: FormGroup
  private placeSub: Subscription
  
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('offerId')){
        this.navCtrl.navigateBack('/places/offer')
        return
      }
      
      this.placeSub = this.placesService.getCurrentPlace(paramMap.get('offerId')).subscribe(place =>{
        this.place = place

        this.editForm = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          }),
        })
      })
    })
  }

  onUpdateOffer(){
    if(!this.editForm.valid){
      return
    }
    console.log(this.editForm)
  }

  ngOnDestroy(){
    this.placeSub.unsubscribe()
  }

}
