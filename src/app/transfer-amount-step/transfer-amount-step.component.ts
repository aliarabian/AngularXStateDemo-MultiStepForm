import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MoneyTransferStateChart} from "../money-transfer-statechart.service";
import {MoneyTransferState} from "../money-transfer.machine";

@Component({
  selector: 'app-transfer-amount-step',
  templateUrl: './transfer-amount-step.component.html',
  styleUrls: ['./transfer-amount-step.component.scss']
})
export class TransferAmountStepComponent implements OnInit {

  @Output("amountEntered") amountEntered: EventEmitter<number> = new EventEmitter<number>()
  @ViewChild("amount") elAmountInput?: ElementRef;
  active: boolean = false;

  constructor(private transferMachine: MoneyTransferStateChart) {
    transferMachine.stateTransition$.subscribe(state => {
      this.active = state.matches(MoneyTransferState.TRANSFER_AMOUNT_STEP);
    })
  }

  ngOnInit(): void {
  }

  nextStep() {
    this.amountEntered.emit(Number(this.elAmountInput?.nativeElement.value))
  }
}
