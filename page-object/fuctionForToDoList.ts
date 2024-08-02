import {expect,Locator,Page} from '@playwright/test'
const expectedResult = require ('../public/expectedResult.json')
export class ToDoList {
    readonly page:Page
    readonly headerText:Locator
    readonly addItemTab:Locator
    readonly toDoListTab:Locator
    readonly completedTab:Locator
    readonly addItemField:Locator
    readonly addButton:Locator
    readonly activityTask:Locator
    readonly firstActivityTaskText:Locator
    readonly deleteActivityTask:Locator
    readonly checkboxActivityTask:Locator
    readonly completedTask:Locator
    
    constructor(page:Page) {
        this.page = page
        this.headerText = page.locator("h1")
        this.addItemTab = page.locator('a.mdl-tabs__tab').nth(0)
        this.toDoListTab = page.locator('a.mdl-tabs__tab').nth(1)
        this.completedTab = page.locator('a.mdl-tabs__tab').nth(2)
        this.addItemField = page.locator('#new-task')
        this.addButton = page.locator('.material-icons')
        this.activityTask = page.locator('#incomplete-tasks')
        this.firstActivityTaskText = page.locator('#text-1')
        this.deleteActivityTask = page.locator('button[id="1"]').nth(0)
        this.checkboxActivityTask = page.locator('span.mdl-checkbox__ripple-container.mdl-js-ripple-effect.mdl-ripple--center')
        this.completedTask = page.locator('ul#completed-tasks>li')
    }

    async verifyToDoListComponent() {
        await expect(this.headerText).toBeVisible();
        await expect(this.headerText).toHaveText(expectedResult.headerText);
        await expect(this.addItemTab).toBeVisible();
        await expect(this.addItemTab).toHaveText(expectedResult.addItemTab);
        await expect(this.addItemTab).toHaveClass(/is-active/);
        await expect(this.addItemField).toBeVisible();
        await expect(this.addButton).toBeVisible();
        await expect(this.toDoListTab).toBeVisible();
        await expect(this.toDoListTab).toHaveText(expectedResult.toDoListTasksTab);
        await expect(this.completedTab).toBeVisible();
        await expect(this.completedTab).toHaveText(expectedResult.completedTab);
    }

    async addActivityAndVerify(tasks: string) {
        await this.addItemField.fill(tasks);
        await this.addButton.click();
        await this.toDoListTab.click();
        await expect(this.activityTask).toBeVisible();
        await expect(this.firstActivityTaskText).toHaveText(tasks)
    }

    async deleteAddedTaskAndVerify() {
        await this.toDoListTab.click();
        await this.deleteActivityTask.click();
        await this.completedTab.click();
        await expect(this.completedTask).not.toBeVisible();
    }

    async checkCompleteTaskCheckboxAndVerify() {
        await this.toDoListTab.click();
        await this.checkboxActivityTask.click();
        await this.completedTab.click();
        await expect(this.completedTask).toBeVisible();
    }

    async deleteCompleteTaskAndVerify() {
        await this.completedTab.click();
        await expect(this.completedTask).toBeVisible();
        await this.deleteActivityTask.click();
        await expect(this.completedTask).not.toBeVisible();
    }
}