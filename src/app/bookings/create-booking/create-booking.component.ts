import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { Place } from 'src/app/places/places.model'

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place
  @Input() selectedMode: 'select' | 'random'
  @ViewChild('f', {static: true}) form: NgForm
  startDate: string
  endDate: string
  bookForm: FormGroup

  constructor(private modalContrl: ModalController,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      NumberOfGuests: [''],
      DateFrom: [''],
      DateTo: ['']
    })
    /* this.bookForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      NumberOfGuests: new FormControl(null, [Validators.required]),
      DateFrom: new FormControl(null, [Validators.required]),
      DateTo: new FormControl(null, [Validators.required])
    }) */
    const availableFrom = new Date(this.selectedPlace.availableFrom)
    const availableTo = new Date(this.selectedPlace.availableTo)
    if(this.selectedMode === 'random'){
        this.startDate = new Date(availableFrom.getTime() + Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())).toISOString()
        this.endDate = new Date(
          new Date(this.startDate).getTime() +
            Math.random() *
              (new Date(this.startDate).getTime() +
                6 * 24 * 60 * 60 * 1000 -
                new Date(this.startDate).getTime())
        ).toISOString()
    }
  }

  onSubmit(){
    if(!this.form.valid || !this.datesValid){
      return
    }
    this.modalContrl.dismiss({bookingDate: {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: this.form.value['guest-number'],
      startDate: this.form.value['date-from'],
      endDate: this.form.value['date-to'],
    }}, 'confirm')
  }

  onCancel(){
    this.modalContrl.dismiss(null, 'cancel')
  }

  datesValid(){
    const startDate = new Date(this.form.value['date-from'])
    const endDate = new Date(this.form.value['date-to'])
    if(endDate > startDate){
      return true
    }
  }
}
