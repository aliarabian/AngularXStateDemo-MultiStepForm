import {assign, createMachine, StateValue} from "xstate";
import {MoneyTransferService} from "./money-transfer.service";
import {InquiryService} from "./inquiry.service";
import {map, take} from "rxjs/operators";

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
  BACK = "BACK",
  RESET_MACHINE = "RESET_MACHINE",
  DESTINATION_VALIDATED = "DESTINATION_VALIDATED",
  TRANSFER_CONFIRMED = "TRANSFER_CONFIRMED",
  TRANSFER_COMPLETED = "TRANSFER_COMPLETED",
}

export enum MoneyTransferState {
  TRANSFER_AMOUNT_STEP = "TRANSFER_AMOUNT_STEP",
  INVALID_TRANSFER_AMOUNT = "INVALID_TRANSFER_AMOUNT",
  AMOUNT_VALIDATION = "AMOUNT_VALIDATION",
  INVALID_TRANSFER_DESTINATION = "INVALID_TRANSFER_DESTINATION",
  TRANSFER_DESTINATION_STEP = "TRANSFER_DESTINATION_STEP",
  TRANSFER_DESTINATION_INQUIRY = "TRANSFER_DESTINATION_INQUIRY",
  TRANSFER_CONFIRMATION = "TRANSFER_CONFIRMATION",
  TRANSFER_OFFSET_STEP = "TRANSFER_OFFSET_STEP",
  TRANSFERRING = "TRANSFERRING",
  TRANSFER_FAILURE = "TRANSFER_FAILURE",
  TRANSFERRED = "TRANSFERRED",
  ENTERING_TRANSFER_AMOUNT = "ENTERING_TRANSFER_AMOUNT",
  TRANSFER_STEP = "TRANSFER_STEP",
  ENTERING_TRANSFER_DESTINATION = "ENTERING_TRANSFER_DESTINATION",
}

type MoneyTransferAmountEntered = { type: MoneyTransferEventTitle.AMOUNT_ENTERED, value: number };
type MoneyTransferDestinationEntered = { type: MoneyTransferEventTitle.DESTINATION_ENTERED, value: string };
type MoneyTransferDestinationValidated = { type: MoneyTransferEventTitle.DESTINATION_VALIDATED, value: boolean };
type MoneyTransferOffsetEntered = { type: MoneyTransferEventTitle.OFFSET_ENTERED, value: string };
type MoneyTransferConfirmed = { type: MoneyTransferEventTitle.TRANSFER_CONFIRMED }
type MoneyTransferCompleted = { type: MoneyTransferEventTitle.TRANSFER_COMPLETED, value: number };
type BACK = { type: MoneyTransferEventTitle.BACK };
type RESET = { type: MoneyTransferEventTitle.RESET_MACHINE };


export type MoneyTransferEvent =
  | MoneyTransferAmountEntered
  | MoneyTransferDestinationEntered
  | MoneyTransferDestinationValidated
  | MoneyTransferOffsetEntered
  | MoneyTransferConfirmed
  | MoneyTransferCompleted
  | BACK
  | RESET;


export interface MoneyTransferStateSchema {
  value: StateValue,
  context: MoneyTransferContext,
  states: {
    [MoneyTransferState.TRANSFER_AMOUNT_STEP]: {
      states: {
        [MoneyTransferState.INVALID_TRANSFER_AMOUNT]: {},
        [MoneyTransferState.AMOUNT_VALIDATION]: {}
        [MoneyTransferState.ENTERING_TRANSFER_AMOUNT]: {}
      }
    },
    [MoneyTransferState.TRANSFER_DESTINATION_STEP]: {},
    [MoneyTransferState.INVALID_TRANSFER_DESTINATION]: {},
    [MoneyTransferState.TRANSFER_DESTINATION_INQUIRY]: {},
    [MoneyTransferState.TRANSFER_STEP]: {
      states: {
        [MoneyTransferState.TRANSFER_OFFSET_STEP]: {},
        [MoneyTransferState.TRANSFER_CONFIRMATION]: {},
        [MoneyTransferState.TRANSFER_FAILURE]: {},
        [MoneyTransferState.TRANSFERRING]: {},
        [MoneyTransferState.TRANSFERRED]: {},
      }
    }
  }
}

export const createMoneyTransferMachine = (moneyTransfer: MoneyTransferService, inquiryService: InquiryService) => {
  return createMachine<MoneyTransferContext, MoneyTransferEvent, MoneyTransferStateSchema>({
    predictableActionArguments: true,
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
          [MoneyTransferState.ENTERING_TRANSFER_AMOUNT]: {},
          [MoneyTransferState.AMOUNT_VALIDATION]: {
            always:
              [
                {
                  target: `#transferMachine.${MoneyTransferState.TRANSFER_DESTINATION_STEP}`,
                  cond: context => context.amount > 0
                },
                {target: MoneyTransferState.INVALID_TRANSFER_AMOUNT}
              ]
          },
          [MoneyTransferState.INVALID_TRANSFER_AMOUNT]: {}
        },
        on: {
          [MoneyTransferEventTitle.AMOUNT_ENTERED]: [
            {
              actions: assign({
                amount: (_, event: MoneyTransferAmountEntered) => event.value
              }),
              target: `.${MoneyTransferState.AMOUNT_VALIDATION}`,
            }
          ]
        }
      },
      [MoneyTransferState.TRANSFER_DESTINATION_STEP]: {
        id: "destStep",
        initial: MoneyTransferState.ENTERING_TRANSFER_DESTINATION,
        states: {
          [MoneyTransferState.ENTERING_TRANSFER_DESTINATION]: {},
          [MoneyTransferState.INVALID_TRANSFER_DESTINATION]: {
            on: {
              [MoneyTransferEventTitle.DESTINATION_ENTERED]: {
                actions: assign({
                  dest: (_, event: MoneyTransferDestinationEntered) => event.value
                }),
                cond: (_, event) => event.value.length > 0,
                target: `#destStep.${MoneyTransferState.TRANSFER_DESTINATION_INQUIRY}`
              }
            }
          },
          [MoneyTransferState.TRANSFER_DESTINATION_INQUIRY]: {
            invoke: {
              src: (context, _) => {
                return inquiryService.inquireSubject(context.dest).pipe(
                  map(response => ({type: MoneyTransferEventTitle.DESTINATION_VALIDATED, value: response})),
                  take(1)
                )
              }
              ,
              onError: {
                target: MoneyTransferState.INVALID_TRANSFER_DESTINATION
              }
            },
            on: {
              [MoneyTransferEventTitle.DESTINATION_VALIDATED]: [
                {
                  cond: (_, event: MoneyTransferDestinationValidated) => {
                    return event.value;
                  },
                  target: `#transferMachine.${MoneyTransferState.TRANSFER_OFFSET_STEP}`
                },
                {
                  target: MoneyTransferState.INVALID_TRANSFER_DESTINATION
                }
              ]
            }
          },
        },
        on: {
          [MoneyTransferEventTitle.BACK]: {
            target: MoneyTransferState.TRANSFER_AMOUNT_STEP
          },
          [MoneyTransferEventTitle.DESTINATION_ENTERED]: {
            actions: assign({
              dest: (_, event: MoneyTransferDestinationEntered) => event.value
            }),
            cond: (_, event) => event.value.length > 0,
            target: `#destStep.${MoneyTransferState.TRANSFER_DESTINATION_INQUIRY}`
          }
        }
      },
      [MoneyTransferState.TRANSFER_OFFSET_STEP]: {
        on: {
          [MoneyTransferEventTitle.BACK]: {
            target: MoneyTransferState.TRANSFER_DESTINATION_STEP
          },
          [MoneyTransferEventTitle.OFFSET_ENTERED]: [
            {
              actions: assign({
                offset: (_, event: MoneyTransferOffsetEntered) => event.value

              }),
              cond: ((_, event: MoneyTransferOffsetEntered) => {
                console.log(event)
                return event.value != undefined && event.value.length > 0
              }),
              target: MoneyTransferState.TRANSFER_STEP
            }
          ]
        }
      },
      [MoneyTransferState.TRANSFER_STEP]: {
        initial: MoneyTransferState.TRANSFER_CONFIRMATION,
        states: {
          [MoneyTransferState.TRANSFER_CONFIRMATION]: {
            on: {
              [MoneyTransferEventTitle.TRANSFER_CONFIRMED]: {
                target: MoneyTransferState.TRANSFERRING
              }
            }
          },
          [MoneyTransferState.TRANSFERRING]: {
            invoke: {
              src: (context) => {
                return moneyTransfer.transfer(context.amount).pipe(
                  map(response => ({type: MoneyTransferEventTitle.TRANSFER_COMPLETED, value: response})),
                  take(1)
                )
              },
              onError: {
                target: MoneyTransferState.TRANSFER_FAILURE
              }
            },
            on: {
              [MoneyTransferEventTitle.BACK]: undefined,
              [MoneyTransferEventTitle.TRANSFER_COMPLETED]: {
                target: MoneyTransferState.TRANSFERRED
              }
            }
          },
          [MoneyTransferState.TRANSFERRED]: {
            type: "final"
          },
          [MoneyTransferState.TRANSFER_FAILURE]: {
            type: "final"
          }
        },
        on: {
          [MoneyTransferEventTitle.BACK]: {
            target: MoneyTransferState.TRANSFER_OFFSET_STEP
          },
        }
      }
    },
    on: {
      [MoneyTransferEventTitle.RESET_MACHINE]:
        {
          actions: assign({
            amount: (_) => {
              return NaN
            },
            dest: (_) => {
              return ""
            },
            offset: (_) => {
              return ""
            },
            errorMessages: (_) => {
              return []
            },
          }),
          target: MoneyTransferState.TRANSFER_AMOUNT_STEP
        }
    }
  });
}
