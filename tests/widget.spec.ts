import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);
    

    await page.context().addCookies([
        {name: 'ab_mainpage_redesign', value: 'a', url: 'https://uchi.ru'},
    ]);

    // open uchi.ru main page
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // close cookies popup
    await page.locator('._UCHI_COOKIE__button').first().click();
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    await widgetPage.getPopularArticles().first().click();

    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getTitle()).toHaveText('Связь с поддержкой');
  });
});
