import {test, expect} from '@playwright/test'
const { faker } = require('@faker-js/faker')

test.describe('Teste básico', () => {
    test('registrar novo usuário', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        // const inputFirstName = page.locator('#input-firstname')
        // await inputFirstName.fill('Lucas')
        await page.fill('id=input-firstname', 'Lucas') 
        await page.fill('id=input-lastname', 'Rosa') //fazendo input diretamente no campo, sem usar o locator
        await page.fill('id=input-email', 'email-4@testpft.com')
        await page.fill('id=input-telephone', '888777666')
        await page.fill('id=input-password', '123456')
        await page.fill('id=input-confirm', '123456')
        await page.click('xpath=//label[@for="input-newsletter-yes"]')
        await page.click('xpath=//label[@for="input-agree"]')
        await page.click('xpath=//input[@value="Continue"]')
        await expect(page).toHaveTitle('Your Account Has Been Created!')
    })
})

test.describe('Teste utilizando método built-in', () => {
    test('registrar novo usuário', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        await page.getByLabel('First Name').fill('Lucas')
        await page.getByLabel('Last Name').fill('Rosa')
        await page.getByLabel('E-mail').fill('email-5@testpft.com')
        await page.getByLabel('Telephone').fill('888777666')

        await page.fill('id=input-password', '123456')
        await page.fill('id=input-confirm', '123456')

        await page.check('xpath=//label[@for="input-newsletter-yes"]')
        await page.check('xpath=//label[@for="input-agree"]')

        await page.getByRole('button', {name:'Continue'}).click()
        
        await expect(page).toHaveTitle('Your Account Has Been Created!')
    })
})

test.describe('Teste utilizando Faker', () => {
    test.only('registrar novo usuário', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        await page.fill('id=input-firstname', faker.person.firstName()) 
        await page.fill('id=input-lastname', faker.person.lastName()) //fazendo input diretamente no campo, sem usar o locator
        await page.fill('id=input-email', faker.internet.email())
        await page.fill('id=input-telephone', faker.phone.number())

        const pwd = faker.internet.password()

        await page.fill('id=input-password', pwd)
        await page.fill('id=input-confirm', pwd)

        await page.click('xpath=//label[@for="input-newsletter-yes"]')
        await page.click('xpath=//label[@for="input-agree"]')

        await page.click('xpath=//input[@value="Continue"]')

        await expect(page).toHaveTitle('Your Account Has Been Created!')

        await page.waitForTimeout(5000)
    })
})


