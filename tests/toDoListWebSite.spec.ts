import { test } from '@playwright/test';
import { ToDoList } from '../page-object/fuctionForToDoList';

let onToDoList : ToDoList
const activityTask = 'Create test case'

test.describe('Verify To Do List website', () => {
  test.beforeEach(async ({ page }) => {
    onToDoList = new ToDoList (page)
      await page.goto('https://abhigyank.github.io/To-Do-List/');
  });

  test('No.01 Verify the system display component correctly when user access to website', async ({ page }) => {
      await onToDoList.verifyToDoListComponent();
  });

  test('No.02 Verify user able to add activity to do when input activity in add item field then click add (`+`) button', async ({ page }) => {
    await onToDoList.addActivityAndVerify(activityTask)
  });

  test('No.03 Verify user able to delete added activity when click Delete button in TO-DO TASKS tab', async ({ page }) => {
    await onToDoList.addActivityAndVerify(activityTask)
    await onToDoList.deleteAddedTaskAndVerify();
  });

  test('No.04 Verify user able to complete activity when checked Checkbox in TO-DO TASKS tab', async ({ page }) => {
    await onToDoList.addActivityAndVerify(activityTask)
    await onToDoList.checkCompleteTaskCheckboxAndVerify();
  });

  test('No.05 Verify user able to delete completed activity when click Delete button in COMPLETED tab', async ({ page }) => {
    await onToDoList.addActivityAndVerify(activityTask)
    await onToDoList.checkCompleteTaskCheckboxAndVerify();
    await onToDoList.deleteCompleteTaskAndVerify();
  });
});