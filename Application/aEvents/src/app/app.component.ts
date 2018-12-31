import { Component ,OnInit} from '@angular/core';
import {PusherService} from './pusher.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'aEvents';

    constructor(){

    }

    ngOnInit(): void {
      
    }
}
