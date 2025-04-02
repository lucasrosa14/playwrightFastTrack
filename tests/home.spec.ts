import {test, expect} from '@playwright/test'

test('aplicação deve estar no ar', async ({page}) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')
    await expect(page).toHaveTitle('Account Login')
})
