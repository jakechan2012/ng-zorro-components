import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { TreeComponent } from './tree.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgZorroAntdModule],
  declarations: [TreeComponent],
  exports: [FormsModule, TreeComponent]
})
export class MyTreeModule {}
