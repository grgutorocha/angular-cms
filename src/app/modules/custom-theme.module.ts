import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules]
})
export class CustomThemeModule {}
