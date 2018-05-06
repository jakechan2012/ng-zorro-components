import { OnInit, EventEmitter } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { MyTreeNodeTrigger, MyTreeNode } from './interface';
export declare class TreeComponent implements OnInit {
    myTreeData: MyTreeNode[];
    myDefaultExpandedKeys: string[];
    myAsyncData: boolean;
    myCheckable: boolean;
    myExpandChange: EventEmitter<MyTreeNodeTrigger>;
    myClick: EventEmitter<{
        key: string;
        isSelected: boolean;
    }>;
    treeData: NzTreeNode[];
    loading: boolean;
    ngOnInit(): void;
    onExpand(e: NzFormatEmitEvent): void;
    onClick(e: NzFormatEmitEvent): void;
    getCheckedTree(): MyTreeNode[];
    private recursiveChecked(nodes);
}
