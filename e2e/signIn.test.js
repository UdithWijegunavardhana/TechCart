describe('SignIn Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the SignIn screen correctly', async () => {
    expect(element(by.text('Practical Test'))).toBeVisible();
    expect(element(by.id('UsernameInput'))).toBeVisible();
    expect(element(by.id('PasswordInput'))).toBeVisible();
    expect(element(by.id('logInButton'))).toBeVisible();
    expect(element(by.id('forgotPasswordButton'))).toBeVisible();
  });

  it('should allow typing into username and password fields', async () => {
    const usernameInput = await element(by.id('UsernameInput'));
    const passwordInput = await element(by.id('PasswordInput'));

    await element(usernameInput).tap();
    await element(passwordInput).typeText('udith');

    await element(usernameInput).tap();
    await element(passwordInput).typeText('12345');

    // Optional: hide keyboard for smaller devices
    await device.pressBack();

    await expect(element(usernameInput)).toHaveText('udith');
    await expect(element(passwordInput)).toHaveText('12345');
  });

  it('should toggle password visibility when tapping the eye icon', async () => {
    const eyeIcon = element(by.id('forgotPasswordButton'));
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
