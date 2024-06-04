import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl: string = 'https://localhost:7246/api/Booking/';

  constructor(private http: HttpClient) {}

  bulkBooking(bulkbookingObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}bulkBooking`, bulkbookingObj);
  }

  quickBooking(quickbookingObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}quickBooking`, quickbookingObj);
  }

  viewUserBooking(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}viewUserBookings/${userId}`);
  }

  cancelBooking(cancelBookingObj: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}cancelBooking`, cancelBookingObj);
  }
}
