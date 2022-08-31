import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TransferAmountStepComponent } from './transfer-amount-step/transfer-amount-step.component';
import { TransferDestinationStepComponent } from './transfer-destination-step/transfer-destination-step.component';
import { TransferOffsetStepComponent } from './transfer-offset-step/transfer-offset-step.component';
import { TransferFinalStepComponent } from './transfer-final-step/transfer-final-step.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    TransferAmountStepComponent,
    TransferDestinationStepComponent,
    TransferOffsetStepComponent,
    TransferFinalStepComponent,
    MoneyTransferComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
