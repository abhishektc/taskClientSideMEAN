import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input()
  time: any;


  remainTime: any;
  currentTime: any;

  constructor() { }

  ngOnInit(): void {

    let timer = window.setInterval(() => {
      this.currentTime = new Date().getTime();

      var distance = (new Date(this.time).getTime()) - this.currentTime;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.remainTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      if (distance < 0) {
        window.clearInterval(timer);
        this.remainTime = 'DeadLine Passed'
      }
    }, 1000)

  }

}
