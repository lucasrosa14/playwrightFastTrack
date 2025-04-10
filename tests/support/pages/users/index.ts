import { Page, expect } from '@playwright/test'
import { UserModel } from '../../../fixtures/user.model'

export class UsersPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visitUrl() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')
    }

    async checkTitle() {
        await expect(this.page).toHaveTitle('Your Account Has Been Created!')
    }

    async register(user: UserModel) {
        
        await this.page.fill('id=input-firstname', user.firstName) 
        await this.page.fill('id=input-lastname', user.lastName)
        await this.page.fill('id=input-email', user.email)
        await this.page.fill('id=input-telephone', user.phone)
        await this.page.fill('id=input-password', user.password)
        await this.page.fill('id=input-confirm', user.confirm)

        if (user.newsletter) {
        await this.page.click('xpath=//label[@for="input-newsletter-yes"]')
        }

        if (user.terms) {
        await this.page.click('xpath=//label[@for="input-agree"]')
        }
        
        await this.page.click('xpath=//input[@value="Continue"]')
    }

}
