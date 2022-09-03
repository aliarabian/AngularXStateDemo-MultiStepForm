import {Component, OnInit} from '@angular/core';
import {MoneyTransferContext, MoneyTransferState} from "../money-transfer.machine";
import {MoneyTransferStateChart} from "../money-transfer-statechart.service";

@Component({
  selector: 'app-transfer-final-step',
  templateUrl: './transfer-final-step.component.html',
  styleUrls: ['./transfer-final-step.component.css']
})
export class TransferFinalStepComponent implements OnInit {
  moneyTransferData?: MoneyTransferContext;

  constructor(private moneyTransferStateMachine: MoneyTransferStateChart) {
  }

  ngOnInit(): void {
    this.moneyTransferStateMachine.stateTransition$.subscribe(state => {
      if (state.value == MoneyTransferState.TRANSFERRED) {
        this.moneyTransferData = state.context;
      }
    })

  }

}
