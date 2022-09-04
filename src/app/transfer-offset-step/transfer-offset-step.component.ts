import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MoneyTransferStateChart} from "../money-transfer-statechart.service";
import {MoneyTransferState} from "../money-transfer.machine";

@Component({
  selector: 'app-transfer-offset-step',
  templateUrl: './transfer-offset-step.component.html',
  styleUrls: ['./transfer-offset-step.component.css']
})
export class TransferOffsetStepComponent implements OnInit {

  @ViewChild("offset") offset?: ElementRef;

  @Output("offsetEntered") offsetEntered: EventEmitter<string> = new EventEmitter<string>()
  active: boolean = false;

  constructor(private transferMachine: MoneyTransferStateChart) {
    transferMachine.stateTransition$.subscribe(state => {
      this.active = state.matches(MoneyTransferState.TRANSFER_OFFSET_STEP);
    })
  }


  ngOnInit(): void {
  }

  nextStep() {
    let value = this.offset?.nativeElement.value;
    console.log(value)
    this.offsetEntered.emit(value);
  }
}
