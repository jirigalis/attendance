import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Category } from 'src/app/modules/core/models/category';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { SnackService } from 'src/app/modules/core/services/snack.service';

interface TreeNode {
    id: number;
    name: string;
    expanded?: boolean;
    children?: TreeNode[];
}


@Component({
    selector: 'manage-categories-dialog',
    templateUrl: './manage-categories-dialog.component.html',
    styleUrls: ['./manage-categories-dialog.component.scss'],
})
export class ManageCategoriesDialogComponent implements OnInit {
    categories: Category[] = [];
    treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeNode>();
    loading = false;
    selectedCategory: Category;

    constructor(
        private dialogRef: MatDialogRef<ManageCategoriesDialogComponent>,
        private categoryService: CategoryService,
        private snack: SnackService,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.refresh();
    }


    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    showDetail(category) {
        this.selectedCategory = this.categories.find(c => c.id === category.id);
    }

    addNewCategory() {
        this.selectedCategory = new Category();
    }

    save(valid) {
        if (this.selectedCategory && valid) {
            this.loading = true;
            const action = this.selectedCategory.id === undefined ? 'create' : 'update';
            this.categoryService[action](this.selectedCategory).subscribe((res) => {
                this.loading = false;
                this.snack.open('Kategorie byla uložena');
                this.refresh();
            });
        } else {
            // show notification
            this.snack.error('Vyplňte všechny povinné údaje');
        }
    }

    createTreeStructure(data: any[]): TreeNode[] {
        const treeMap = new Map<number, TreeNode>();

        // Step 1: Create a map of nodes by their 'id' as keys
        for (const node of data) {
            treeMap.set(node.id, { id: node.id, name: node.name });
        }

        // Step 2: Build the tree structure by assigning children to their respective parents
        const tree: TreeNode[] = [];
        for (const node of data) {
            if (node.parent !== 0) {
                const parentNode = treeMap.get(node.parent);
                if (parentNode) {
                    if (!parentNode.children) {
                        parentNode.children = [];
                        parentNode.expanded = true;
                    }
                    parentNode.children.push(treeMap.get(node.id)!);
                }
            } else {
                tree.push(treeMap.get(node.id)!);
            }
        }

        return tree;
    }

    refresh() {
        this.loading = true;
        this.categoryService.getAll().subscribe((categories) => {
            this.categories = categories;
            this.dataSource.data = this.createTreeStructure(categories);
            this.treeControl.dataNodes = this.dataSource.data;
            this.treeControl.expandAll();
            this.loading = false;
        });
    }

    close() {
        this.dialogRef.close();
    }

}
