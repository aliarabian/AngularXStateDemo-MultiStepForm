import {MoneyTransferStateChart} from "./money-transfer-statechart.service";
import {MoneyTransferState} from "./money-transfer.machine";

export abstract class TransferBase {
  active: boolean = false;

  constructor(private transferMachine: MoneyTransferStateChart) {

    transferMachine.stateTransition$.subscribe(state => {
      this.active = state.matches(MoneyTransferState.TRANSFER_DESTINATION_STEP);
    })
  }

}
