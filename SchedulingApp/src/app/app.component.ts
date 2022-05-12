import { Component } from '@angular/core';
import { DateDetail } from 'src/model/DateDetail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDetails: DateDetail;
  showDetailsPage: Boolean = false;
  
  ViewDetails(dateDetailsPage: DateDetail) {
    this.currentDetails = dateDetailsPage;
    this.showDetailsPage = true;
  }

  changeDetails() {
    this.showDetailsPage = !this.showDetailsPage;
    console.log(this.showDetailsPage);
  }
}
