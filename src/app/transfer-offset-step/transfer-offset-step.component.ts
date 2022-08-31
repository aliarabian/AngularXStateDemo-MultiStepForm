import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-transfer-offset-step',
  templateUrl: './transfer-offset-step.component.html',
  styleUrls: ['./transfer-offset-step.component.css']
})
export class TransferOffsetStepComponent implements OnInit {

  @ViewChild("offset") offset?: ElementRef;

  @Output("offsetEntered") offsetEntered: EventEmitter<string> = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit(): void {
  }

  nextStep() {
    this.offsetEntered.emit(this.offset?.nativeElement.value);
  }
}
