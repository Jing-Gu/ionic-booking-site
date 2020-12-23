import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
//import { CreateBookingComponent } from './create-booking/create-booking.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    BookingsPageRoutingModule
  ],
  declarations: [BookingsPage]
})
export class BookingsPageModule {}
