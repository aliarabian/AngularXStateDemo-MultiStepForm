import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-transfer-amount-step',
  templateUrl: './transfer-amount-step.component.html',
  styleUrls: ['./transfer-amount-step.component.css']
})
export class TransferAmountStepComponent implements OnInit {

  @Output("amountEntered") amountEntered: EventEmitter<number> = new EventEmitter<number>()
  @ViewChild("amount") elAmountInput?: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  nextStep() {
    this.amountEntered.emit(Number(this.elAmountInput?.nativeElement.value))
  }
}
