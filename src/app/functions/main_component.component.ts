import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: './main_component.component.html',
  styleUrls: ['./main_component.component.css']
})

export class MainComponent implements OnInit {
usersList : any;
more: number;

  constructor(public rest:RestService, private route: ActivatedRoute,) {
    this.more = 0;
    //  this.isMore = false;
  }

  ngOnInit() {
      this.getUsers()
  }


  onRowSelect(_a, _b) {
    // console.log(_a,_b);
  }

  getUsers() {
    this.readEndPoint('users?offset='+this.more.toString());  
  }

  getMore() {
    this.more += 25;
    this.getUsers();
  }

  reset() {
    this.more = 0;
    this.getUsers();
  }

  readEndPoint(_call: string) {
    this.rest.getPagerEndpoint(_call).subscribe( (res_data) => {
      // ('pager:', res_data);
      this.usersList = res_data['users'];
    });
  }

}
