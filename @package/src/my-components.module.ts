import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MyTreeModule } from './tree';

export * from './tree';

@NgModule({
  imports: [NgZorroAntdModule.forRoot(), MyTreeModule],
  exports: [NgZorroAntdModule, MyTreeModule]
})
export class MyComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyComponentsModule
    };
  }
}
