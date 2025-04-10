import { Locator, Page, expect } from '@playwright/test'
import { UserModel } from '../../../fixtures/user.model'

export class UsersPage {

    readonly page: Page
    readonly urlRegister: string
    readonly firstName: Locator
    readonly lastName: Locator  
    readonly email: Locator
    readonly telephone: Locator
    readonly password: Locator
    readonly confirm: Locator
    readonly newsletterYes: Locator
    readonly terms: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.urlRegister = 'https://ecommerce-playground.lambdatest.io/index.php?route=account/register'
        this.firstName = page.locator('#input-firstname')
        this.lastName = page.locator('#input-lastname')
        this.email = page.locator('#input-email')
        this.telephone = page.locator('#input-telephone')
        this.password = page.locator('#input-password')
        this.confirm = page.locator('#input-confirm')
        this.newsletterYes = page.locator('xpath=//label[@for="input-newsletter-yes"]')
        this.terms = page.locator('xpath=//label[@for="input-agree"]')  
        this.continueButton = page.locator('xpath=//input[@value="Continue"]')
        
    }

    async visitUrl() {
        await this.page.goto(this.urlRegister)
    }

    async checkTitle() {
        await expect(this.page).toHaveTitle('Your Account Has Been Created!')
    }

    async register(user: UserModel) {
        
        await this.firstName.fill(user.firstName) 
        await this.lastName.fill(user.lastName)
        await this.email.fill(user.email)
        await this.telephone.fill(user.telephone)
        await this.password.fill(user.password)
        await this.confirm.fill(user.confirm)

        if (user.newsletter) {
        await this.newsletterYes.click()
        }

        if (user.terms) {
        await this.terms.click()
        }
        
        await this.continueButton.click()
    }

}
