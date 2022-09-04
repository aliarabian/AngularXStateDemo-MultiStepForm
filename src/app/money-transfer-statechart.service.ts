import {
  BaseActionObject,
  interpret,
  Interpreter,
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
  MoneyTransferEventTitle,
  MoneyTransferStateSchema
} from "./money-transfer.machine";
import {BehaviorSubject} from "rxjs";
import {InquiryService} from "./inquiry.service";


@Injectable({providedIn: "root"})
export class MoneyTransferStateChart {
  private defaultContext: MoneyTransferContext = {amount: NaN, dest: "", offset: "", errorMessages: []};
  private MONEY_TRANSFER_MACHINE: StateMachine<MoneyTransferContext, MoneyTransferStateSchema, MoneyTransferEvent>
    = createMoneyTransferMachine(this.moneyTransfer, this.inquiryService)
  private service: Interpreter<MoneyTransferContext, MoneyTransferStateSchema,
    MoneyTransferEvent,
    { value: any; context: MoneyTransferContext },
    ResolveTypegenMeta<TypegenDisabled, MoneyTransferEvent, BaseActionObject, ServiceMap>>;
  stateTransition$: BehaviorSubject<State<MoneyTransferContext, MoneyTransferEvent, MoneyTransferStateSchema, any, ResolveTypegenMeta<TypegenDisabled, MoneyTransferEvent, BaseActionObject, ServiceMap>>>;


  constructor(private moneyTransfer: MoneyTransferService, private inquiryService: InquiryService) {
    this.service = interpret(this.MONEY_TRANSFER_MACHINE);
    this.stateTransition$ =
      new BehaviorSubject(this.service.initialState)
    this.addOnTransitionListener();

  }

  private addOnTransitionListener() {
    this.service.onTransition((state: any) => {
      if (state.changed) {
        console.log(state);
        this.stateTransition$.next(state);
      }
    })
  }

  start() {
    this.service.start();
  }

  send(transferEvent: MoneyTransferEvent) {
    return this.service.send(transferEvent);
  }

  reset() {
    let state = this.service.send(MoneyTransferEventTitle.RESET_MACHINE);
    console.log(state)

  }
}
