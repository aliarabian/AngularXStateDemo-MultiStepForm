import {Injectable} from '@angular/core';
import {BaseActionObject, interpret, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled} from "xstate";
import {
  MONEY_TRANSFER_MACHINE,
  MoneyTransferContext,
  MoneyTransferEvent,
  MoneyTransferEventTitle,
  MoneyTransferStateSchema
} from "./money-transfer.machine";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoneyTransferManagerService {
  private moneyTransferMachineService = interpret(MONEY_TRANSFER_MACHINE);
  stateTransition$: BehaviorSubject<State<MoneyTransferContext, MoneyTransferEvent, MoneyTransferStateSchema, any, ResolveTypegenMeta<TypegenDisabled, MoneyTransferEvent, BaseActionObject, ServiceMap>>> =
    new BehaviorSubject(this.moneyTransferMachineService.initialState)

  constructor() {
    this.moneyTransferMachineService.onTransition(state => {
        if (state.changed) {
          console.log(state.context)
          this.stateTransition$.next(state)
        }
      }
    );
    this.moneyTransferMachineService.start();

  }

  send(transferEvent:MoneyTransferEvent) {
    this.moneyTransferMachineService.send(transferEvent);
  }


}
