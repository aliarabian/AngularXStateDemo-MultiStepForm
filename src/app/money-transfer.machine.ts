import {assign, Machine, StateValue} from "xstate";
import {MoneyTransferService} from "./money-transfer.service";

export interface MoneyTransferContext {
  amount: number,
  dest: string,
  offset: string,
  errorMessages: string[];
}

export enum MoneyTransferEventTitle {
  AMOUNT_ENTERED = "AMOUNT_ENTERED",
  DESTINATION_ENTERED = "DESTINATION_ENTERED",
  OFFSET_ENTERED = "OFFSET_ENTERED",
  BACK = "BACK"
}

export enum MoneyTransferState {
  TRANSFER_AMOUNT_STEP = "TRANSFER_AMOUNT_STEP",
  INVALID_TRANSFER_AMOUNT = "INVALID_TRANSFER_AMOUNT",
  INVALID_TRANSFER_DESTINATION = "INVALID_TRANSFER_DESTINATION",
  TRANSFER_DESTINATION_STEP = "TRANSFER_DESTINATION_STEP",
  TRANSFER_DESTINATION_INQUIRY = "TRANSFER_DESTINATION_INQUIRY",
  TRANSFER_CONFIRMATION = "TRANSFER_CONFIRMATION",
  TRANSFER_OFFSET_STEP = "TRANSFER_OFFSET_STEP",
  TRANSFERRING = "TRANSFERRING",
  TRANSFER_FAILURE = "TRANSFER_FAILURE",
  TRANSFERRED = "TRANSFERRED",
  ENTERING_TRANSFER_AMOUNT = "ENTERING_TRANSFER_AMOUNT",
}

type MoneyTransferAmountEntered = { type: MoneyTransferEventTitle.AMOUNT_ENTERED, value: number };
type MoneyTransferDestinationEntered = { type: MoneyTransferEventTitle.DESTINATION_ENTERED, value: string };
type MoneyTransferOffsetEntered = { type: MoneyTransferEventTitle.OFFSET_ENTERED, value: string };
type BACK = { type: MoneyTransferEventTitle.BACK, value: undefined };
export type MoneyTransferEvent =
  | MoneyTransferAmountEntered
  | MoneyTransferDestinationEntered
  | MoneyTransferOffsetEntered
  | BACK


export interface MoneyTransferStateSchema {
  value: StateValue,
  context: MoneyTransferContext,
  states: {
    [MoneyTransferState.TRANSFER_AMOUNT_STEP]: {
      states: {
        [MoneyTransferState.INVALID_TRANSFER_AMOUNT]: {},
        [MoneyTransferState.ENTERING_TRANSFER_AMOUNT]: {}
      }
    },
    [MoneyTransferState.TRANSFER_DESTINATION_STEP]: {
      states: {
        [MoneyTransferState.INVALID_TRANSFER_DESTINATION]: {},
        [MoneyTransferState.TRANSFER_DESTINATION_INQUIRY]: {}
      }
    },
    [MoneyTransferState.TRANSFER_OFFSET_STEP]: {},
    [MoneyTransferState.TRANSFER_CONFIRMATION]: {},
    [MoneyTransferState.TRANSFER_FAILURE]: {},
    [MoneyTransferState.TRANSFERRING]: {},
    [MoneyTransferState.TRANSFERRED]: {},
  }
}

export const createMoneyTransferMachine = (moneyTransfer: MoneyTransferService) => {
  return Machine<MoneyTransferContext, MoneyTransferStateSchema, MoneyTransferEvent>({
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
          initial: MoneyTransferState.ENTERING_TRANSFER_AMOUNT,
          states: {
            [MoneyTransferState.ENTERING_TRANSFER_AMOUNT]: {
              on: {
                [MoneyTransferEventTitle.AMOUNT_ENTERED]: {
                  actions: assign({
                    amount: (context, event: MoneyTransferAmountEntered) => event.value
                  }),
                  target: `../${MoneyTransferState.TRANSFER_DESTINATION_STEP}`,
                }
              }
            },
            [MoneyTransferState.INVALID_TRANSFER_AMOUNT]: {}
          },

        },

        [MoneyTransferState.TRANSFER_DESTINATION_STEP]: {
          initial: MoneyTransferState.TRANSFER_DESTINATION_INQUIRY,
          states: {
            [MoneyTransferState.INVALID_TRANSFER_DESTINATION]: {},
            [MoneyTransferState.TRANSFER_DESTINATION_INQUIRY]: {}
          },
          on: {
            [MoneyTransferEventTitle.DESTINATION_ENTERED]: {
              actions: assign({
                dest: (_, event: MoneyTransferDestinationEntered) => event.value
              }),
              target: MoneyTransferState.TRANSFER_OFFSET_STEP
            }
          }
        },
        [MoneyTransferState.TRANSFER_OFFSET_STEP]: {

          on: {
            [MoneyTransferEventTitle.OFFSET_ENTERED]: {
              actions: assign({
                offset: (_, event: MoneyTransferOffsetEntered) => event.value
              }),
              target: MoneyTransferState.TRANSFERRED
            }
          }
        },
        [MoneyTransferState.TRANSFERRING]: {},
        [MoneyTransferState.TRANSFERRED]: {},
        [MoneyTransferState.TRANSFER_CONFIRMATION]: {},
        [MoneyTransferState.TRANSFER_FAILURE]: {},
      }
    }
  );
}
