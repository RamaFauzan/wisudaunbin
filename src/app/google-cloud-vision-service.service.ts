import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
providedIn: 'root'
})

export class GoogleCloudVisionServiceService {
  api_key:"AIzaSyDCcN9wgGxARbyv0wA2B-8pq_dVLiqUoMY";
  constructor(
    public http: HttpClient
  ) { }
  
  getLabels(base64Image) {
    const body = {
    "requests": [
    {
    "features": [
    {
    "type": "OBJECT_LOCALIZATION",
    "maxResults": 10
    }],
    "image": {
    "content": base64Image
    }}]}
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDCcN9wgGxARbyv0wA2B-8pq_dVLiqUoMY', body);
    }
  
  
}

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token",
    "Content-Type": "application/json; charset=UTF-8"
  })
};


