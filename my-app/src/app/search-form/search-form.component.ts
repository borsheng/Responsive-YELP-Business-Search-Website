import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import $, { error } from "jquery";
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent implements OnInit {

  keyword: any = "";
  distance: any;
  category: any;
  location: any;
  lat: any;
  lng: any;
  yelp_response: any;
  result = false;
  // search_table: any;

  isUnchanged: any;
  location_ip = false;
  locValue: any;
  info: any;

  searchKeywordCtrl = new FormControl();
  filteredKeyword: any;
  isLoading = false;
  //errorMsg!: string;
  minLengthTerm = 3;

  constructor(private http: HttpClient, private myService: MyserviceService) { 
    this.http = http;
    this.myService = myService;
  }

  async submit_button(event: any) {
    this.keyword = event.target.keyword.value;
    this.distance = event.target.distance.value;
    this.category = event.target.category.value;
    this.location = event.target.location.value;

    this.myService.search_table = false;

    let yelp_url = '/yelp?term=' + this.keyword + '&distance=' + this.distance + '&category=' + 
                    this.category + '&location=' + this.location + '&lat=' + this.lat + '&lng=' + this.lng;
    this.http.get(yelp_url).subscribe( (data) => {
      let response = JSON.stringify(data);
      let yelp_response = JSON.parse(response);
      this.myService.yelp_data = yelp_response['businesses'];
      console.log(this.myService.yelp_data);
      this.myService.search_table = true;
      // clear the detail card
      this.myService.detail_boolean = false;

      // show no results if not found.
      if (this.myService.yelp_data.length == 0) {
        this.result = true;
        this.myService.search_table = false;
      }
      else {
        this.result = false;
      }
      console.log(this.result);

    });

    console.log("yelp_url");
  }

  clear() {
    this.myService.search_table = false;
    this.myService.detail_boolean = false;
    this.isUnchanged = false;
    this.result = false;
  }


  checkbox_button() {
    let latitude, longitude;
    this.isUnchanged = true;
    this.locValue = "";
    if (this.location_ip == false) {
        this.locValue = "";
        this.isUnchanged = true;

        $.ajax({
            url: 'https://ipinfo.io/json?token=f68843f6889c3c',
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(data) {
              this.info = data;
              this.info = this.info['loc'].split(',');
              latitude = this.info[0];
              longitude = this.info[1];
            }
        });
        this.lat = latitude;
        this.lng = longitude;
        console.log(this.lat);
        console.log(this.lng);
    }

    else if (this.location_ip == true) {
      this.isUnchanged = false;
    }
  }


  onSelected() {
    this.keyword = this.keyword;
  }

  displayWith(value: any) {
    return value;
  }

  ngOnInit(): void {
    this.myService.search_table = false;
    this.myService.detail_boolean = false;

    this.searchKeywordCtrl.valueChanges
      .pipe(
        filter(res => {
          console.log(res);
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {

          this.filteredKeyword = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get('/autocomplete?text=' + value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe((data: any) => {
        console.log(data)
        for (const element of data["categories"]){
          this.filteredKeyword.push(element["title"]);
        }
        for (const element of data.terms){
          this.filteredKeyword.push(element.text);
        }

        console.log(this.filteredKeyword);
      });
  }

  public get no_result() : boolean{
    return this.result;
  }

}
