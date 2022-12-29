import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  public search_table: any;
  public yelp_data: any;
  public detail_boolean: any;
  public detail_data: any;
  public review_data: any;
  public mapOptions: google.maps.MapOptions = {center: { lat: 0, lng: 0 }, zoom: 14};
  public marker = {position: {lat: 0, lng: 0}};
  public reserve_data = new Array;
  public reserve_boolean = true;

  constructor(private http: HttpClient) { }

}
