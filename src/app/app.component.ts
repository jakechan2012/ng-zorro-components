import { Component } from '@angular/core';
import { MyTreeNodeTrigger } from '@myscope/components';

import { MockService } from './mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-zorro-components';
  data = [];
  clicked = '';
  completeData = '';
  constructor(private mock: MockService) {}

  loadData(params: MyTreeNodeTrigger) {
    const { key, callback } = params;
    callback(this.mock.get('tree'));
  }

  onClick(params: { key: string; isSelected: boolean }) {
    const { key, isSelected } = params;
    this.clicked = key;
  }

  onComplete(nodes) {
    this.completeData = JSON.stringify(nodes);
  }
}
