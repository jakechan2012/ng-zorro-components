var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';
var TreeComponent = /** @class */ (function () {
    function TreeComponent() {
        this.myTreeData = [];
        this.myDefaultExpandedKeys = [];
        this.myAsyncData = false;
        this.myCheckable = false;
        this.myExpandChange = new EventEmitter();
        this.myClick = new EventEmitter();
        this.loading = false;
    }
    TreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.myTreeData.length === 0 && this.myAsyncData) {
            this.loading = true;
            this.myExpandChange.emit({
                key: '',
                callback: function (children) {
                    if (children instanceof Array) {
                        _this.treeData = children.map(function (item) { return new NzTreeNode(item); });
                        _this.loading = false;
                    }
                    else {
                        children.subscribe(function (cnodes) {
                            _this.treeData = cnodes.map(function (item) { return new NzTreeNode(item); });
                            _this.loading = false;
                        });
                    }
                }
            });
        }
        else {
            this.treeData = this.myTreeData.map(function (item) { return new NzTreeNode(item); });
        }
    };
    TreeComponent.prototype.onExpand = function (e) {
        if (e.node.getChildren().length === 0 && e.node.isExpanded) {
            this.myExpandChange.emit({
                key: e.node.key,
                callback: function (children) {
                    if (children instanceof Array) {
                        e.node.addChildren(children.map(function (item) { return new NzTreeNode(item); }));
                    }
                    else {
                        children.subscribe(function (cnodes) {
                            e.node.addChildren(cnodes.map(function (item) { return new NzTreeNode(item); }));
                        });
                    }
                }
            });
        }
    };
    TreeComponent.prototype.onClick = function (e) {
        this.myClick.emit({ key: e.node.key, isSelected: e.node.isSelected });
    };
    TreeComponent.prototype.getCheckedTree = function () {
        return this.recursiveChecked(this.treeData);
    };
    TreeComponent.prototype.recursiveChecked = function (nodes) {
        var _this = this;
        var map = [];
        nodes.forEach(function (node) {
            if (node.isChecked || node.isHalfChecked) {
                map.push({
                    key: node.key,
                    title: node.title,
                    children: node.isLeaf ? null : _this.recursiveChecked(node.children),
                    isLeaf: node.isLeaf
                });
            }
        });
        return map;
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TreeComponent.prototype, "myTreeData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TreeComponent.prototype, "myDefaultExpandedKeys", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "myAsyncData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "myCheckable", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "myExpandChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "myClick", void 0);
    TreeComponent = __decorate([
        Component({
            selector: 'my-tree',
            template: '<nz-tree *ngIf="!loading" [(ngModel)]="treeData" [nzDefaultExpandedKeys]="myDefaultExpandedKeys" [nzAsyncData]="myAsyncData" [nzShowLine]="true" [nzCheckable]="myCheckable" (nzExpandChange)="onExpand($event)" (nzClick)="onClick($event)"></nz-tree><nz-spin *ngIf="loading"></nz-spin>',
            styles: [':host {  display: block;}nz-spin {  text-align: center;}']
        })
    ], TreeComponent);
    return TreeComponent;
}());
export { TreeComponent };
