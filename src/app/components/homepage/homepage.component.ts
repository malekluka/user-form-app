import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-homePage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomeComponent implements OnInit {

  usersCount : number = 0
  constructor( private userDataService: UserDataService ){}

  ngOnInit() {
    this.usersCount = this.userDataService.getUsers().length
  }
}