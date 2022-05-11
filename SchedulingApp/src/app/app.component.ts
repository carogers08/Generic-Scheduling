import { Component } from '@angular/core';
import { DateDetail } from 'src/model/DateDetail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDetails: DateDetail;
  showDetails: Boolean = false;
  
  ViewDetails(dateDetailsPage: DateDetail) {
    this.currentDetails = dateDetailsPage;
    this.showDetails = true;
  }

  changeDetails() {
    this.showDetails = !this.showDetails;
    console.log(this.showDetails);
  }
}
