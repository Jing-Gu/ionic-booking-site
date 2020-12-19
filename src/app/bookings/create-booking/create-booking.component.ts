import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { Place } from 'src/app/places/places.model'

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place

  constructor(private modalContrl: ModalController) { }

  ngOnInit() {}

  onBookPlace(){
    this.modalContrl.dismiss({message: 'You booked it!'}, 'confirm')
  }

  onCancel(){
    this.modalContrl.dismiss(null, 'cancel')
  }
}
