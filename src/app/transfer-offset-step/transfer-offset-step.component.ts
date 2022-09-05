import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MoneyTransferStateChart} from "../money-transfer-statechart.service";
import {MoneyTransferEventTitle, MoneyTransferState} from "../money-transfer.machine";

@Component({
  selector: 'app-transfer-offset-step',
  templateUrl: './transfer-offset-step.component.html',
  styleUrls: ['./transfer-offset-step.component.scss']
})
export class TransferOffsetStepComponent implements OnInit {

  @ViewChild("offset") offset?: ElementRef;

  @Output("offsetEntered") offsetEntered: EventEmitter<string> = new EventEmitter<string>()
  active: boolean = false;
  offsetValue: any;

  constructor(private transferMachine: MoneyTransferStateChart) {
    transferMachine.stateTransition$.subscribe(state => {
      this.active = state.matches(MoneyTransferState.TRANSFER_OFFSET_STEP);
      this.offsetValue = state.context.offset;
    })
  }


  ngOnInit(): void {
  }

  nextStep() {
    let value = this.offset?.nativeElement.value;
    console.log(value)
    this.offsetEntered.emit(value);
  }

  back() {
    this.transferMachine.send({type: MoneyTransferEventTitle.BACK})
  }
}
