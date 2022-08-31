import {Component, OnInit} from '@angular/core';
import {MoneyTransferManagerService} from "../money-transfer-manager.service";
import {BaseActionObject, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled} from "xstate";
import {
  MoneyTransferContext,
  MoneyTransferEvent,
  MoneyTransferEventTitle,
  MoneyTransferState,
  MoneyTransferStateSchema
} from "../money-transfer.machine";

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  finalStep: MoneyTransferState = MoneyTransferState.TRANSFER_RESULT;
  state?: State<MoneyTransferContext, MoneyTransferEvent, MoneyTransferStateSchema, any, ResolveTypegenMeta<TypegenDisabled, MoneyTransferEvent, BaseActionObject, ServiceMap>>;

  constructor(private moneyTransferStateManager: MoneyTransferManagerService) {
  }

  ngOnInit(): void {
    this.moneyTransferStateManager.stateTransition$.subscribe(currentState => {
      this.state = currentState;
      console.log(this.state?.value)
    })
  }

  amountEntered(amount: number) {
    console.log(amount)
    this.moneyTransferStateManager.send({type: MoneyTransferEventTitle.AMOUNT_ENTERED, value: amount});
  }

  destinationEntered(destination: string) {
    this.moneyTransferStateManager.send({type: MoneyTransferEventTitle.DESTINATION_ENTERED, value: destination});
  }

  offsetEntered(offset: string) {
    this.moneyTransferStateManager.send({type: MoneyTransferEventTitle.OFFSET_ENTERED, value: offset});
  }
}
