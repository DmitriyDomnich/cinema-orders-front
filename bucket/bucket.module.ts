import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BucketRoutingModule } from './bucket-routing.module';
import { BucketComponent } from './bucket.component';


@NgModule({
  declarations: [
    BucketComponent
  ],
  imports: [
    CommonModule,
    BucketRoutingModule
  ]
})
export class BucketModule { }
