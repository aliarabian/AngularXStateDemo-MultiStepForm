import {assign, Machine} from "xstate";

export interface MoneyTransferContext {
  amount: number,
  dest: string,
  offset: string,
  errorMessages: string[];
}

export enum MoneyTransferEventTitle {
  AMOUNT_ENTERED = "AMOUNT_TRANSFER",
  DESTINATION_ENTERED = "DESTINATION_ENTERED",
  OFFSET_ENTERED = "OFFSET_ENTERED",
  BACK = "BACK"
}

export enum MoneyTransferState {
  TRANSFER_AMOUNT_STEP = "TRANSFER_AMOUNT_STEP",
  TRANSFER_DESTINATION_STEP = "TRANSFER_DESTINATION_STEP",
  TRANSFER_OFFSET_STEP = "TRANSFER_OFFSET_STEP",
  TRANSFER_RESULT = "TRANSFER_RESULT  "
}

export type MoneyTransferEvent = | { type: MoneyTransferEventTitle.AMOUNT_ENTERED; value: number }
  | { type: MoneyTransferEventTitle.DESTINATION_ENTERED; value: string }
  | { type: MoneyTransferEventTitle.OFFSET_ENTERED; value: string }
  | { type: MoneyTransferEventTitle.BACK }


export interface MoneyTransferStateSchema {
  states: {
    [MoneyTransferState.TRANSFER_AMOUNT_STEP]: {},
    [MoneyTransferState.TRANSFER_DESTINATION_STEP]: {},
    [MoneyTransferState.TRANSFER_OFFSET_STEP]: {},
    [MoneyTransferState.TRANSFER_RESULT]: {}
  }
}

export const MONEY_TRANSFER_MACHINE = Machine<MoneyTransferContext, MoneyTransferStateSchema, MoneyTransferEvent>({
    id: "transferMachine",
    initial: MoneyTransferState.TRANSFER_AMOUNT_STEP,
    context: {
      amount: Number.NaN,
      dest: '',
      offset: '',
      errorMessages: []
    },
    states: {
      [MoneyTransferState.TRANSFER_AMOUNT_STEP]: {
        on: {
          [MoneyTransferEventTitle.AMOUNT_ENTERED]: {
            actions: assign({
              amount: (_, event) => event.value
            }),
            target: MoneyTransferState.TRANSFER_DESTINATION_STEP
          }
        }
      },
      [MoneyTransferState.TRANSFER_DESTINATION_STEP]: {
        on: {
          [MoneyTransferEventTitle.DESTINATION_ENTERED]: {
            actions: assign({
              dest: (_, event) => event.value
            }),
            target: MoneyTransferState.TRANSFER_OFFSET_STEP
          }
        }
      },
      [MoneyTransferState.TRANSFER_OFFSET_STEP]: {

        on: {
          [MoneyTransferEventTitle.OFFSET_ENTERED]: {
            actions: assign({
              offset: (_, event) => event.value
            }),
            target: MoneyTransferState.TRANSFER_RESULT
          }
        }
      },
      [MoneyTransferState.TRANSFER_RESULT]: {}
    }
  }
);
