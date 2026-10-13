describe('SignIn Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the SignIn screen correctly', async () => {
    await expect(element(by.text('Practical Test'))).toBeVisible();
    await expect(element(by.id('UsernameInput'))).toBeVisible();
    await expect(element(by.id('PasswordInput'))).toBeVisible();
    await expect(element(by.id('logInButton'))).toBeVisible();
    await expect(element(by.id('forgotPasswordButton'))).toBeVisible();
  });

  it('should allow typing into username and password fields', async () => {
    const usernameInput = element(by.id('UsernameInput'));
    const passwordInput = element(by.id('PasswordInput'));

    await usernameInput.tap();
    await usernameInput.typeText('udith');

    await passwordInput.tap();
    await passwordInput.typeText('12345');

    // Optional: hide keyboard for smaller devices
    await device.pressBack();

    await expect(usernameInput).toHaveText('udith');
    await expect(passwordInput).toHaveText('12345');
  });

  it('should toggle password visibility when tapping the eye icon', async () => {
    const eyeIcon = element(by.id('togglePasswordButton'));
    await expect(eyeIcon).toBeVisible();

    await eyeIcon.tap();
    await eyeIcon.tap();
  });

  it('should submit the form and navigate to Home screen', async () => {
    await element(by.id('UsernameInput')).clearText();
    await element(by.id('PasswordInput')).clearText();

    await element(by.id('UsernameInput')).typeText('emilys');
    await element(by.id('PasswordInput')).typeText('emilyspass');
    await device.pressBack();

    await element(by.id('logInButton')).tap();

    await waitFor(element(by.text("What's New")))
      .toBeVisible()
      .withTimeout(15000);

    await expect(element(by.text("What's New"))).toBeVisible();
  });
});
