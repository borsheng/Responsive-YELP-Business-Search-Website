import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MyserviceService } from '../myservice.service';
import $ from "jquery";

import { AppComponent } from '../app.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})

export class DetailCardComponent implements OnInit {
  @ViewChild("closebutton")closebutton: any;

  twitter_svg = 'assets/Twitter-logo.svg';
  facebook_svg = 'assets/Facebook_icon.svg';
  clock_jpg = 'assets/clock.jpg';
  detail_category: any;
  email: any;
  date: any;
  hours: any;
  minutes: any;
  email_val: any;
  date_val: any;
  hours_val: any;
  minutes_val: any;
  show_modal!: boolean;
  reservations: any;
  reserve_array = new Array;
  booking_array = new Array;

  public get get_category () {
    let arr = [];
    for (let i = 0; i < (this.myService.detail_data.categories).length; i++) {
      arr[i] = this.myService.detail_data.categories[i].title;
    }
    this.detail_category = arr.join(' | ');
    return this.detail_category;
  }

  public get get_map_options() {
    return this.myService.mapOptions; 
  }

  public get get_marker() {
    return this.myService.marker;
  }

  constructor(private myService: MyserviceService) {
    this.myService = myService;
  }

  public get show_detail(): boolean {
    return this.myService.detail_boolean;
  }

  public get yelp_detail() {
    return this.myService.detail_data;
  }

  public get yelp_review() {
    return this.myService.review_data;
  }

  public get status_true(): boolean {
    if (this.myService.detail_data.hours[0].is_open_now == true){
      return true;
    }
    else {
      return false;
    }
  }

  public back_table() {
    this.myService.detail_boolean = false;
    console.log("back");
  }

  ngOnInit(): void {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  submit_reservation(event: any) {
    alert("Reservation created!");
    // this.show_modal = false;
    this.email = event.target.email.value;
    this.date = event.target.date.value;
    this.hours = event.target.hours.value;
    this.minutes = event.target.minutes.value;
    console.log(this.email, this.date, this.hours, this.minutes);
    let reserve_data = {"name": this.myService.detail_data.name, "email": this.email, "date": this.date, "hours":this.hours, "minutes":this.minutes};
    if (!this.myService.reserve_data) {
      this.myService.reserve_data = new Array;
    }
    this.myService.reserve_data.push(reserve_data);
    let Booking = new BookingComponent(this.myService);
    Booking.set_bookings();
    this.myService.reserve_boolean = false;
    this.closebutton.nativeElement.click();
  }

  close_reservation() {
    this.email_val = "";
    this.date_val = "";
    this.hours_val = "";
    this.minutes_val = "";
  }

  cancel() {
    alert("Reservation cancelled!");
    this.myService.reserve_boolean = true;

    this.reservations = localStorage.getItem('reservations');
    this.reserve_array = JSON.parse(this.reservations);
    for (let i = 0; i < this.reserve_array.length; i++) {
      if (this.reserve_array[i].name == this.myService.detail_data.name) {
        this.reserve_array.splice(i, 1);
      }
    }
    this.myService.reserve_data = this.reserve_array;
    localStorage.setItem('reservations', JSON.stringify(this.reserve_array));
    let Booking = new BookingComponent(this.myService);
    Booking.set_bookings();
  }

  // public get show_if_modal(): boolean {
  //   return this.show_modal;
  // }

  public get show_reserve(): boolean {
    return this.myService.reserve_boolean;
  }

  public get show_phone(): boolean {
    if (this.myService.detail_data.display_phone == undefined || this.myService.detail_data.display_phone == ''){
      return false;
    }
    else {
      return true;
    }
  }

  public get show_price(): boolean {
    if (this.myService.detail_data.price == undefined || this.myService.detail_data.price == ''){
      return false;
    }
    else {
      return true;
    }
  }

  public get show_address(): boolean {
    if (this.myService.detail_data.location.display_address == undefined || this.myService.detail_data.location.display_address == ''){
      return false;
    }
    else {
      return true;
    }
  }

  // public get show_cat(): boolean {
  //   if (this.myService.detail_data.categories == undefined || this.myService.detail_data.categories == ''){
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  // public get show_status(): boolean {
  //   if (this.myService.detail_data.hours[0].is_open_now == undefined || this.myService.detail_data.hours[0].is_open_now == ''){
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }
  
}
