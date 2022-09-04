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
  active: boolean = false;

  constructor(private moneyTransferStateMachine: MoneyTransferStateChart) {
    moneyTransferStateMachine.stateTransition$.subscribe(state => {
      this.active = state.matches(MoneyTransferState.TRANSFER_CONFIRMATION) || state.matches(MoneyTransferState.TRANSFERRED);
      this.moneyTransferData = Object.assign({}, state.context);
    })
  }

  ngOnInit(): void {
  }


}
