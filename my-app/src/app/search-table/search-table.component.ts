import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent implements OnInit {

  yelp_id: any;

  reservations: any;
  reserve_array = new Array;
  booking_array = new Array;

  constructor(private http: HttpClient, private myService: MyserviceService) {
    this.http = http;
    this.myService = myService;
  }

  public get show_table(): boolean {
    return this.myService.search_table;
  }

  public get show_yelp() {
    return this.myService.yelp_data;
  }

  public get show_detail(): boolean {
    return this.myService.detail_boolean;
  }

  async get_detail(yelpid: any) {

    // this.myService.detail_boolean = true;
    this.yelp_id = yelpid;
    let yelp_detail_url = '/detail?id=' + this.yelp_id;
    console.log(yelp_detail_url);
    this.myService.reserve_boolean = true;

    this.http.get(yelp_detail_url).subscribe(async (data) => {
      let response = JSON.stringify(data);
      let detail_response = JSON.parse(response);
      this.myService.detail_data = detail_response;
      let lat = detail_response.coordinates.latitude;
      let lng = detail_response.coordinates.longitude;
      this.myService.mapOptions = {center: { lat: lat, lng: lng }, zoom: 14};
      this.myService.marker = {position: {lat: lat, lng: lng}};
      console.log(this.myService.detail_data.name);
      console.log(this.myService.mapOptions);
      console.log(this.myService.marker);

      // let it show "cancel reservatoin" if already reserved
      this.reservations = localStorage.getItem('reservations');
      this.reserve_array = JSON.parse(this.reservations);
      let name;
      if (this.myService.detail_data){
        name = this.myService.detail_data.name;
      }
      if(!this.reserve_array) {
        this.reserve_array = new Array;
      }
      for (let i = 0; i < this.reserve_array.length; i++) {
        if (this.reserve_array[i].name == name) {
          this.myService.reserve_boolean = false;
        }
      }

      // let the detail card show
      this.myService.detail_boolean = true;
    });

  }

  async get_review(yelpid: any) {

    this.yelp_id = yelpid;
    let yelp_review_url = '/review?id=' + this.yelp_id;
    console.log(yelp_review_url);

    this.http.get(yelp_review_url).subscribe(async (data) => {
      let response = JSON.stringify(data);
      let review_response = JSON.parse(response);
      this.myService.review_data = review_response;
      console.log(this.myService.review_data.reviews[0].rating);
    });

  }

  ngOnInit(): void {}

}