import {test, expect} from '@playwright/test'
import { UserModel } from './fixtures/user.model'
import { UsersPage } from './support/pages/users'
import { faker } from '@faker-js/faker'


test.describe('Teste básico', () => {
    test('Teste de cadastro de usuário básico', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        // const inputFirstName = page.locator('#input-firstname')
        // await inputFirstName.fill('Lucas')
        await page.fill('id=input-firstname', 'Lucas') 
        await page.fill('id=input-lastname', 'Rosa') //fazendo input diretamente no campo, sem usar o locator
        await page.fill('id=input-email', faker.internet.email())
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
    test('Teste de cadastro de usuário utilizando métodos built-in', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        await page.getByLabel('First Name').fill('Lucas')
        await page.getByLabel('Last Name').fill('Rosa')
        await page.fill('id=input-email', faker.internet.email())
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
    test('Teste de cadastro de usuário utilizando Faker', async ({page}) => {
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

test.describe('Teste com outras validações', () => {
    test('Teste de cadastro de usuário com outras validações', async ({page}) => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        await page.fill('id=input-firstname', 'Lucas') 
        await page.fill('id=input-lastname', 'Rosa') //fazendo input diretamente no campo, sem usar o locator
        await page.fill('id=input-email', faker.internet.email())
        await page.fill('id=input-telephone', '888777666')
        await page.fill('id=input-password', '123456')
        await page.fill('id=input-confirm', '123456')
        await page.click('xpath=//label[@for="input-newsletter-yes"]')
        await page.click('xpath=//label[@for="input-agree"]')
        await page.click('xpath=//input[@value="Continue"]')

        await expect(page).toHaveTitle('Your Account Has Been Created!')
        await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/success')

        await expect(page.locator('xpath=//div[@id="content"]/h1')).toHaveText(' Your Account Has Been Created!')
        const continue_button = page.locator('xpath=//a[text()="Continue"]')
        await expect(continue_button).toBeVisible()

        await page.waitForTimeout(5000)
    })
})

test.describe('Teste com modelagem de dados', () => {
    test('Teste de cadastro de usuário com modelagem de dados', async ({page}) => {

        const user: UserModel = {
            firstName: 'Lucas',
            lastName: 'Rosa',
            email: faker.internet.email(),
            telephone: '888777666',
            password: '123456',
            confirm: '123456',
            newsletter: true,
            terms: true
        }

        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
        await page.fill('id=input-firstname', user.firstName) 
        await page.fill('id=input-lastname', user.lastName) //fazendo input diretamente no campo, sem usar o locator
        await page.fill('id=input-email', user.email)
        await page.fill('id=input-telephone', user.telephone)
        await page.fill('id=input-password', user.password)
        await page.fill('id=input-confirm', user.confirm)

        if (user.newsletter) {
        await page.click('xpath=//label[@for="input-newsletter-yes"]')
        }

        if (user.terms) {
        await page.click('xpath=//label[@for="input-agree"]')
        }
        
        await page.click('xpath=//input[@value="Continue"]')

        await expect(page).toHaveTitle('Your Account Has Been Created!')

        await page.waitForTimeout(5000)
    })
})

test.describe('Teste com Page Object Model', () => {
    test('Teste de cadastro de usuário com Page Object Model', async ({page}) => {

        const user: UserModel = {
            firstName: 'Lucas',
            lastName: 'Rosa',
            email: faker.internet.email(),
            telephone: '888777666',
            password: '123456',
            confirm: '123456',
            newsletter: true,
            terms: true
        }

        const usersPage = new UsersPage(page)
        
        await usersPage.visitUrl()
        await usersPage.register(user)
        await usersPage.checkTitle()
        

    })
})

