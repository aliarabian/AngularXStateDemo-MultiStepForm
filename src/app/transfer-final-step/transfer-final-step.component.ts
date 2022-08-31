import {Component, OnInit} from '@angular/core';
import {MoneyTransferManagerService} from "../money-transfer-manager.service";
import {MoneyTransferContext, MoneyTransferState} from "../money-transfer.machine";

@Component({
  selector: 'app-transfer-final-step',
  templateUrl: './transfer-final-step.component.html',
  styleUrls: ['./transfer-final-step.component.css']
})
export class TransferFinalStepComponent implements OnInit {
  moneyTransferData?: MoneyTransferContext;

  constructor(private moneyTransferStateMachine: MoneyTransferManagerService) {
  }

  ngOnInit(): void {
    this.moneyTransferStateMachine.stateTransition$.subscribe(state => {
      if (state.value == MoneyTransferState.TRANSFER_RESULT) {
        this.moneyTransferData = state.context;
      }
    })

  }

}
