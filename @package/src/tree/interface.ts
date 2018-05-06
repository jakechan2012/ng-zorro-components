import { NzTreeNode } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

export interface MyTreeNode {
  key: string;
  title: string;
  children?: MyTreeNode[];
  isLeaf?: boolean;
}

export interface MyTreeNodeTrigger {
  key: string;
  callback: (children: MyTreeNode[] | Observable<MyTreeNode[]>) => void;
}
