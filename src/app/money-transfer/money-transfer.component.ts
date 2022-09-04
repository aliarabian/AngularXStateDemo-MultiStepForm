import {Component, OnInit} from '@angular/core';
import {BaseActionObject, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled} from "xstate";
import {
  MoneyTransferContext,
  MoneyTransferEvent,
  MoneyTransferEventTitle,
  MoneyTransferState,
  MoneyTransferStateSchema
} from "../money-transfer.machine";
import {MoneyTransferStateChart} from "../money-transfer-statechart.service";

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  state?: State<MoneyTransferContext, MoneyTransferEvent, MoneyTransferStateSchema, any, ResolveTypegenMeta<TypegenDisabled, MoneyTransferEvent, BaseActionObject, ServiceMap>>;

  constructor(private moneyTransferMachine: MoneyTransferStateChart) {
    moneyTransferMachine.stateTransition$.subscribe((state) => {
        if (state?.matches(MoneyTransferState.TRANSFERRED)) {
          moneyTransferMachine.reset();
        }
      }
    )
  }

  ngOnInit(): void {
    this.moneyTransferMachine.start();
  }

  amountEntered(amount: number) {
    this.state = this.moneyTransferMachine.send({type: MoneyTransferEventTitle.AMOUNT_ENTERED, value: amount});
  }

  destinationEntered(destination: string) {
    this.state = this.moneyTransferMachine.send({
      type: MoneyTransferEventTitle.DESTINATION_ENTERED,
      value: destination
    });
  }

  offsetEntered(offset: string) {
    this.state = this.moneyTransferMachine.send({type: MoneyTransferEventTitle.OFFSET_ENTERED, value: offset});
  }

  isFinalState() {
    return this.state?.matches(MoneyTransferState.TRANSFERRED);
  }

  transferConfirmed() {
    this.moneyTransferMachine.send({type: MoneyTransferEventTitle.TRANSFER_CONFIRMED})
  }
}
