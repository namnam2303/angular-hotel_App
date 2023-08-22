import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations : Reservation[] = [];

  constructor() {
    let savedReservations = localStorage.getItem('reservations');
    this.reservations = savedReservations? JSON.parse(savedReservations) : [];
  }
  // CRUD reservation:
  getReservations(): Reservation[] {
    return this.reservations;
  } 
  getReservation(id : string) : Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(newReservation : Reservation) : void {
    newReservation.id = Date.now().toString();
    this.reservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id : string) : void {
    this.reservations = this.reservations.filter(res => res.id !== id);
    alert(this.reservations.length)
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id : string , updatedReservation : Reservation) : void {
    let index = this.reservations.findIndex(res => res.id === id);
    updatedReservation.id = id;
    this.reservations[index] = updatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
