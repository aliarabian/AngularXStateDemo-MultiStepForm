import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-transfer-destination-step',
  templateUrl: './transfer-destination-step.component.html',
  styleUrls: ['./transfer-destination-step.component.css']
})
export class TransferDestinationStepComponent implements OnInit {

  @ViewChild("destination") destination?: ElementRef;

  @Output("destinationEntered") destinationEntered: EventEmitter<string> = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit(): void {
  }

  nextStep() {
    this.destinationEntered.emit(this.destination?.nativeElement.value);
  }
}
