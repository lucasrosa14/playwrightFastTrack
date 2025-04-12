import { test, expect } from '@playwright/test';
import { UsersPage } from './support/pages/users';


test.describe('Teste de login', () => {
    test('Teste de login com credenciais inválidas deve falhar', async ({ page }) => {
        const usersPage = new UsersPage(page)
        await usersPage.visitUrl();
        await page.fill('#username', 'usuario_invalido');
        await page.fill('#password', 'senha_errada');
        await page.click('#login-button');
        const errorMessage = page.locator('#error-message');
        await expect(errorMessage).toHaveText('Credenciais inválidas');
    });
})

test.describe('Teste de acesso a página restrita sem autenticação', () => {
    test('Teste de acesso a página restrita sem autenticação deve falhar', async ({ page }) => {
        const usersPage = new UsersPage(page)
        await usersPage.visitUrl();
        const loginPrompt = page.locator('#login-prompt');
        await expect(loginPrompt).toBeVisible();
    });
})

