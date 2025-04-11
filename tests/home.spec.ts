import {test, expect} from '@playwright/test'

test('aplicação deve estar no ar', async ({page}) => {
    await page.goto('https://ecommerce-playground.lambdatest.io')
    await expect(page).toHaveTitle('Your Store')
    
})
