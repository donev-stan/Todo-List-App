import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { StatsComponent } from './stats/stats.component';
import { ListComponent } from './list/list.component';

import { MaterialModule } from './shared/material.module';
import { EditDialogComponent } from './list/edit-task/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    StatsComponent,
    ListComponent,
    EditDialogComponent,
  ],
  imports: [BrowserModule, FormsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
