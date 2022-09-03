import {
  BaseActionObject,
  interpret,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  StateMachine,
  TypegenDisabled
} from "xstate";
import {MoneyTransferService} from "./money-transfer.service";
import {Injectable} from "@angular/core";
import {
  createMoneyTransferMachine,
  MoneyTransferContext,
  MoneyTransferEvent,
  MoneyTransferStateSchema
} from "./money-transfer.machine";
import {BehaviorSubject} from "rxjs";


@Injectable({providedIn: "root"})
export class MoneyTransferStateChart {
  private MONEY_TRANSFER_MACHINE: StateMachine<MoneyTransferContext, MoneyTransferStateSchema, MoneyTransferEvent>
    = createMoneyTransferMachine(this.moneyTransfer)
  private service: any;
  stateTransition$: BehaviorSubject<State<MoneyTransferContext, MoneyTransferEvent, MoneyTransferStateSchema, any, ResolveTypegenMeta<TypegenDisabled, MoneyTransferEvent, BaseActionObject, ServiceMap>>>;

  constructor(private moneyTransfer: MoneyTransferService) {
    this.service = interpret(this.MONEY_TRANSFER_MACHINE);
    this.stateTransition$ =
      new BehaviorSubject(this.service.initialState)
    this.service.onTransition((state: any) => {
      // if (state.changed) {
        console.log(state);
        this.stateTransition$.next(state);
      // }
    })

  }

  start() {
    this.service.start();
  }

  send(transferEvent: MoneyTransferEvent) {
    let state = this.service.send(transferEvent);

    console.log(state.changed)
  }
}
