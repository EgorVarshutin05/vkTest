import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page, baseURL}) => {
    widgetPage = new WidgetPage(page);

    await page.context().addCookies([
        {name: 'ab_mainpage_redesign', value: 'a', url: baseURL},
    ]);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.locator('._UCHI_COOKIE__button:visible').first().click();
  });

  test('opens', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async () => {
    await widgetPage.openWidget();

    await widgetPage.getPopularArticles().first().click();

    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getTitle()).toHaveText('Связь с поддержкой');
  });

  test('opens popular article', async () => {
    await widgetPage.openWidget();

    const article = widgetPage.getPopularArticles().first();
    const articleName = await article.innerText();

    await article.click();

    await expect(widgetPage.getArticleTitle()).toHaveText(articleName);
  });
});
