import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-dialog-template',
  template: `
    <div class="spinner-wrapper">
      <mat-spinner [diameter]="50"></mat-spinner>
      <p>데이터를 처리중입니다.</p>
    </div>
  `,
  styles: [`
    p { display: inline-block; vertical-align: middle; margin: 0; }
    mat-spinner { display: inline-block; vertical-align: middle; margin-right: 20px; }
    .spinner-wrapper { display: inline-block; }
  `]
})
export class DialogTemplateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
