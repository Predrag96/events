import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  response:Object;

  constructor(private data:DataService) { }

  ngOnInit() {
  }

  OnButtonClick(form:NgForm){
    this.data.register(form).subscribe(data=>{
      this.response = data
      console.log(this.response)
    })
    
  }

}
