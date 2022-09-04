import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MoneyTransferStateChart} from "../money-transfer-statechart.service";
import {MoneyTransferState} from "../money-transfer.machine";

@Component({
  selector: 'app-transfer-destination-step',
  templateUrl: './transfer-destination-step.component.html',
  styleUrls: ['./transfer-destination-step.component.css']
})
export class TransferDestinationStepComponent implements OnInit {

  @ViewChild("destination") destination?: ElementRef;

  @Output("destinationEntered") destinationEntered: EventEmitter<string> = new EventEmitter<string>()
  active: boolean = false;

  constructor(private transferMachine: MoneyTransferStateChart) {
    transferMachine.stateTransition$.subscribe(state => {
      this.active = state.matches(MoneyTransferState.TRANSFER_DESTINATION_STEP);
    })
  }

  ngOnInit(): void {
  }

  nextStep() {
    this.destinationEntered.emit(this.destination?.nativeElement.value);
  }
}
