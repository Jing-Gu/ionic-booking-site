import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferPage } from './offer.page';

const routes: Routes = [
  /* {
    path: '',
    redirectTo: 'offer',
    pathMatch: 'full'
  }, */
  {
    path: '',
    component: OfferPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new-offer/new-offer.module').then( m => m.NewOfferPageModule)
  },
  {
    path: 'edit/:offerId',
    loadChildren: () => import('./edit-offer/edit-offer.module').then( m => m.EditOfferPageModule)
  },
  {
    path: 'book/:offerId',
    loadChildren: () => import('./offer-bookings/offer-bookings.module').then( m => m.OfferBookingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferPageRoutingModule {}
