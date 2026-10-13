# TechCart manual test checklist

Run on your Mac. Test login: `emilys` / `emilyspass` (expected profile: **Emily Johnson**, `emily.johnson@x.dummyjson.com`).
Everything marked **(untested)** has only been build/unit verified so far, because nobody has run it on a device yet.

## 0. Prerequisites (once)

- [ ] `yarn install` finishes without errors
- [ ] `.env`, `.env.dev`, `.env.qa`, `.env.uat` exist at the repo root (copy `.env.example`; each needs `API_BASE_URL=https://dummyjson.com`)
- [ ] `cd ios && pod install` completes (Pods are already installed on this Mac)
- [ ] An Android emulator is booted (Android Studio, Device Manager). Your AVDs: `Pixel_8`, `Pixel_7_Pro`, `Pixel_9_Pro`, `Medium_Phone`
- [ ] Terminal 1: `yarn start` (Metro). Leave it running for all debug builds

## 1. Static checks and unit tests

- [ ] `yarn test` → **8 passed**, 3 suites
- [ ] `yarn lint` → **0 errors** (6 known warnings in Button, generic.enaums, Search, AppNavigator)
- [ ] `npx tsc --noEmit` → **1 known error** (`Search.tsx`, `image` on dummy data). Anything else is new

## 2. The app flow (run this once per variant in sections 3 and 4)

| # | Step | Expected |
|---|------|----------|
| F1 | Launch the app | Sign-in screen, header **TechCart** |
| F2 | Log in with a wrong password | Login fails, you stay on Sign-in |
| F3 | Log in as `emilys` / `emilyspass` | Spinner, then Home: "What's New" with a 2-column product grid |
| F4 | Tap a product | Spinner, then the **real** product: title, price, rating, `discount N%`, `#tags`, image. Moving the quantity slider changes the total. Back returns to Home |
| F5 | Profile tab | **Emily Johnson**, her email, her avatar |
| F6 | Restore: force-quit the app, relaunch | Goes straight to Home (no login). Profile still shows Emily. Products load |
| F7 | Profile → **Log out**, then force-quit and relaunch | Sign-in screen (session is gone, Profile data is not restored) |
| F8 | Error + retry (once per platform): log in, turn on airplane mode, force-quit, relaunch | Home shows the error state with **Try Again**. Turn airplane mode off, tap Try Again, the grid loads. Repeat on a product detail: error + Try Again, then it loads |

Not bugs (out of scope): Home still greets "John!" with a "2" cart badge, Cart uses dummy data, Search uses dummy data.

## 3. Android, each flavor

Start an emulator, then run one command per row. Launcher names and ids are what you should see on the emulator.

| Variant | Command | Launcher name | Application id | Env file |
|---------|---------|---------------|----------------|----------|
| dev  | `yarn android:dev`  | TechCart Dev | `com.techcart.dev` | `.env.dev` |
| qa   | `yarn android:qa`   | TechCart QA  | `com.techcart.qa`  | `.env.qa` |
| uat  | `yarn android:uat`  | TechCart UAT | `com.techcart.uat` | `.env.uat` |
| prod | `yarn android:prod` | TechCart     | `com.techcart`     | `.env` |

For each variant:

- [ ] dev: installs and opens, F1–F7 pass
- [ ] qa: installs and opens, F1–F7 pass
- [ ] uat: installs and opens, F1–F7 pass
- [ ] prod: installs and opens, F1–F7 pass. It is a **release** build: it does not need Metro, and Gradle prints `WARNING: MYAPP_UPLOAD_STORE_FILE is not set...`
- [ ] dev, qa and uat are installed **side by side** (3 separate icons)
- [ ] F8 on one Android variant

### Env isolation (Android)

- [ ] Edit `.env.qa`: `API_BASE_URL=https://invalid.example`
- [ ] `yarn android:qa` → login **fails** in TechCart QA
- [ ] `yarn android:dev` → login still **works** in TechCart Dev
- [ ] Put `API_BASE_URL=https://dummyjson.com` back in `.env.qa`, rebuild QA, login works again

## 4. iOS, each scheme

The first build of each scheme compiles all Pods and takes a while. Pick a simulator with `--simulator "iPhone 16 Pro"` if the default is wrong.

| Scheme | Command | App name on the home screen | Env file |
|--------|---------|-----------------------------|----------|
| TechCart Dev  | `yarn ios:dev`  | TechCart Dev  | `.env.dev` |
| TechCart QA   | `yarn ios:qa`   | TechCart QA   | `.env.qa` |
| TechCart UAT  | `yarn ios:uat`  | TechCart UAT  | `.env.uat` |
| TechCart      | `yarn ios:prod` | TechCart      | `.env` |

- [ ] Dev: builds, opens, F1–F7 pass
- [ ] QA: builds, opens, F1–F7 pass
- [ ] UAT: builds, opens, F1–F7 pass
- [ ] Prod: builds, opens, F1–F7 pass
- [ ] Xcode lists 4 shared schemes: TechCart, TechCart Dev, TechCart QA, TechCart UAT
- [ ] F8 on one iOS scheme
- [ ] Env isolation: set a bad `API_BASE_URL` in `.env.qa`, run `yarn ios:qa` → login fails. If it does not change, clean first with `yarn "ios:clean:build folder:qa"`. `yarn ios:dev` still works. Restore the file **(untested; ENABLE_LOGGING was confirmed to differ per scheme in the built libraries)**

## 5. Detox on Android **(untested: build verified, tests never run)**

- [ ] Choose an emulator: either create an AVD named `Pixel_API_35`, or edit `avdName` in `.detoxrc.js` to `Pixel_8` (**do not commit** that edit)
- [ ] Metro is running (`yarn start`)
- [ ] `yarn detox:build:android` ends with BUILD SUCCESSFUL and creates `android/app/build/outputs/apk/dev/debug/app-dev-debug.apk`
- [ ] `yarn detox:test:android` runs **only** `e2e/signIn.test.js` (not `e2e/exercises/`)
- [ ] 4 tests pass: displays the screen, typing into both fields, toggle password, login to Home
- [ ] If it can't start the emulator: your `~/Library/Android/sdk/emulator/` folder has no `emulator` launcher (it is in `emulator_/`). Reinstall **Android Emulator** in SDK Manager. This is not a repo bug
- [ ] If the typing test fails on `toHaveText` or `pressBack`: note it. These two calls were kept from the original test and are the likeliest to need follow-up

## 6. Release signing and fresh install

- [ ] `yarn android:prod:build` prints the `WARNING: MYAPP_UPLOAD_STORE_FILE is not set` line and succeeds
- [ ] `~/Library/Android/sdk/build-tools/36.1.0/apksigner verify --print-certs android/app/build/outputs/apk/prod/release/app-prod-release.apk` → `CN=Android Debug`
- [ ] Optional: build with `-PMYAPP_UPLOAD_STORE_FILE=... ` (a throwaway keystore) and confirm the certificate changes
- [ ] Last, because it takes a while: `rm -rf node_modules && yarn install` succeeds (this is the `patch-package` postinstall fix)
