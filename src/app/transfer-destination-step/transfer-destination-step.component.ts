import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MoneyTransferStateChart} from "../money-transfer-statechart.service";
import {MoneyTransferEventTitle} from "../money-transfer.machine";
import {TransferBase} from "../transfer-base";

@Component({
  selector: 'app-transfer-destination-step',
  templateUrl: './transfer-destination-step.component.html',
  styleUrls: ['./transfer-destination-step.component.scss']
})
export class TransferDestinationStepComponent extends TransferBase implements OnInit {

  @ViewChild("destination") destination?: ElementRef;

  @Output("destinationEntered") destinationEntered: EventEmitter<string> = new EventEmitter<string>();
  active: boolean = false;
  state?: any;
  dest: any;

  constructor(private stateChart: MoneyTransferStateChart) {
    super(stateChart);
    stateChart.stateTransition$.subscribe(state => {
      this.state = state;
      this.dest = this.state.context.dest;
    })
  }

  ngOnInit(): void {
  }

  nextStep() {
    this.destinationEntered.emit(this.destination?.nativeElement.value);
  }

  back() {
    this.stateChart.send({type: MoneyTransferEventTitle.BACK})
  }
}
