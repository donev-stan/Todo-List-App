import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatGridListModule,
    DialogModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class MaterialModule {}
