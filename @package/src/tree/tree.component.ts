import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

import { MyTreeNodeTrigger, MyTreeNode } from './interface';

@Component({
  selector: 'my-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit {
  @Input() myTreeData: MyTreeNode[] = [];
  @Input() myDefaultExpandedKeys: string[] = [];
  @Input() myAsyncData = false;
  @Input() myCheckable = false;

  @Output() myExpandChange = new EventEmitter<MyTreeNodeTrigger>();
  @Output() myClick = new EventEmitter<{ key: string; isSelected: boolean }>();

  treeData: NzTreeNode[];
  loading = false;

  ngOnInit(): void {
    if (this.myTreeData.length === 0 && this.myAsyncData) {
      this.loading = true;
      this.myExpandChange.emit({
        key: '',
        callback: (children: MyTreeNode[] | Observable<MyTreeNode[]>) => {
          if (children instanceof Array) {
            this.treeData = children.map(item => new NzTreeNode(item));
            this.loading = false;
          } else {
            children.subscribe(cnodes => {
              this.treeData = cnodes.map(item => new NzTreeNode(item));
              this.loading = false;
            });
          }
        }
      });
    } else {
      this.treeData = this.myTreeData.map(item => new NzTreeNode(item));
    }
  }

  onExpand(e: NzFormatEmitEvent): void {
    if (e.node.getChildren().length === 0 && e.node.isExpanded) {
      this.myExpandChange.emit({
        key: e.node.key,
        callback: (children: MyTreeNode[] | Observable<MyTreeNode[]>) => {
          if (children instanceof Array) {
            e.node.addChildren(children.map(item => new NzTreeNode(item)));
          } else {
            children.subscribe(cnodes => {
              e.node.addChildren(cnodes.map(item => new NzTreeNode(item)));
            });
          }
        }
      });
    }
  }

  onClick(e: NzFormatEmitEvent): void {
    this.myClick.emit({ key: e.node.key, isSelected: e.node.isSelected });
  }

  getCheckedTree() {
    return this.recursiveChecked(this.treeData);
  }

  private recursiveChecked(nodes: NzTreeNode[]): MyTreeNode[] {
    const map: MyTreeNode[] = [];
    nodes.forEach(node => {
      if (node.isChecked || node.isHalfChecked) {
        map.push({
          key: node.key,
          title: node.title,
          children: node.isLeaf ? null : this.recursiveChecked(node.children),
          isLeaf: node.isLeaf
        });
      }
    });
    return map;
  }
}
