import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  trashcan_png = 'assets/trashcan.png';
  reservations: any;
  reserve_array = new Array;
  booking_array = new Array;

  constructor(private myService: MyserviceService) {this.myService = myService;}

  ngOnInit(): void {
    this.reservations = localStorage.getItem('reservations');
    this.booking_array = JSON.parse(this.reservations);
    this.myService.reserve_data = this.booking_array;
  }

  public get show_bookings() {
    return this.booking_array;
  }

  public get have_reservations(): boolean {
    if (!this.booking_array || this.booking_array.length == 0 || this.booking_array == undefined) {
      return false;
    }
    else { 
      return true;
    }
  }

  set_bookings() {
    this.reserve_array = this.myService.reserve_data;
    localStorage.setItem('reservations', JSON.stringify(this.reserve_array));
    this.reservations = localStorage.getItem('reservations');
    this.booking_array = JSON.parse(this.reservations);
  }

  delete_bookings(index: number) {
    alert("Reservation cancelled!");
    this.reservations = localStorage.getItem('reservations');
    this.reserve_array = JSON.parse(this.reservations);
    for (let i = 0; i < this.reserve_array.length; i++) {
      if (i == index) {
        this.reserve_array.splice(i, 1);
      }
    }
    this.myService.reserve_data = this.reserve_array;
    localStorage.setItem('reservations', JSON.stringify(this.reserve_array));
    this.set_bookings();
  }

}
