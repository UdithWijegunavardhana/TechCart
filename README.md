# TechCart 🛒 — React Native Practical Assessment

A simple, modern e-commerce mobile app built with **React Native 0.78.2**, demonstrating state management, side effects, navigation, form validation, and modular architecture.

This project was created as a practical assessment and uses real APIs to showcase user authentication, product listing, detail viewing, and cart handling.

---

## 🔧 Tech Stack & Features

| Feature         | Description |
|----------------|-------------|
| **React Native** | Version 0.78.2 |
| **Redux Toolkit** | Global state management |
| **Redux-Saga** | Handling async logic (API calls, session restore, etc.) |
| **React Navigation** | Stack and bottom tab navigators |
| **MMKV** | Fast key-value storage for the session (**not encrypted**, see note below) |
| **Axios** | Typed HTTP client with retry support |
| **react-hook-form** | Elegant form handling and validation |
| **Reusable UI Components** | Buttons, Inputs, ProductCards, Error & Loading screens |
| **API Integration** | Uses `https://dummyjson.com` for products and auth |

> **Security note**: MMKV is used here unencrypted to keep the example simple. In a real app, store access/refresh tokens in the iOS Keychain or Android Keystore (for example with `react-native-keychain`), not in MMKV.

---

## 📱 Screenshots

### Login Screen
<img src="./screenshots/signIn.png" width="300" />

### Home Screen
<img src="./screenshots/home.png" width="300" />

### Product Details
<img src="./screenshots/productDetails.png" width="300" />

### Cart 
<img src="./screenshots/cart.png" width="300" />

### Profile 
<img src="./screenshots/profile.png" width="300" />

### Search 
<img src="./screenshots/search.png" width="300" />

### Recent Search 
<img src="./screenshots/recentSearches.png" width="300" />

---

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

---

## Environments

The app has four environments, configured with [react-native-config](https://github.com/lugg/react-native-config). Each one reads its own env file at the project root:

| Environment | Env file | Android | iOS scheme |
|-------------|----------|---------|------------|
| Dev  | `.env.dev` | `yarn android:dev`  | `yarn ios:dev` (`TechCart Dev`) |
| QA   | `.env.qa`  | `yarn android:qa`   | `yarn ios:qa` (`TechCart QA`) |
| UAT  | `.env.uat` | `yarn android:uat`  | `yarn ios:uat` (`TechCart UAT`) |
| Prod | `.env`     | `yarn android:prod` | `yarn ios:prod` (`TechCart`) |

The `.env*` files are not committed. Create them from the template:

```sh
cp .env.example .env && cp .env.example .env.dev && cp .env.example .env.qa && cp .env.example .env.uat
```

The API base URL is read from `API_BASE_URL` in `app/api/axiosInstance.ts`. Values are baked in at **build time**, so rebuild the app after changing an env file.

- **Android**: product flavors (`dev`, `qa`, `uat`, `prod`) pick the file, see `envConfigFiles` in `android/app/build.gradle`. Build one variant per Gradle run. `dev`, `qa` and `uat` are debug builds and need Metro (`yarn start`); `yarn android:prod` installs a release build that bundles the JS.
- **iOS**: the Xcode configurations `Debug-<Env>` and `Release-<Env>` pick the file, see `ENVIRONMENTS` in `ios/Podfile`. Run `cd ios && pod install` after changing it.

---

## Running tests

```sh
yarn test            # unit tests (Jest + React Native Testing Library, matchers included)
yarn lint            # ESLint
npx tsc --noEmit     # type check
```

End-to-end tests use Detox on Android (Metro must be running, and an emulator named in `.detoxrc.js` must exist, see [End-to-end tests](#end-to-end-tests-detox-android)):

```sh
yarn start                  # terminal 1
yarn detox:build:android    # terminal 2
yarn detox:test:android
```

`e2e/exercises/` holds an intentionally buggy test used as a class exercise. It is never run.

---

## Release signing (Android)

Release builds are signed with your upload key when these properties exist in `~/.gradle/gradle.properties` (**not** in this repo):

```properties
MYAPP_UPLOAD_STORE_FILE=/absolute/path/to/upload.keystore
MYAPP_UPLOAD_STORE_PASSWORD=...
MYAPP_UPLOAD_KEY_ALIAS=...
MYAPP_UPLOAD_KEY_PASSWORD=...
```

Without them, Gradle prints a warning and falls back to the **debug** key, so a local build still works. Never publish such a build.

```sh
yarn android:prod:build       # signed APK: android/app/build/outputs/apk/prod/release/
yarn android:prod:build_aab   # signed AAB for the Play Store
```

To create a keystore, follow the [React Native signing guide](https://reactnative.dev/docs/signed-apk-android). Never commit a keystore or its passwords.

Check which key signed an APK:

```sh
$ANDROID_HOME/build-tools/<version>/apksigner verify --print-certs android/app/build/outputs/apk/prod/release/app-prod-release.apk
```

---

## End-to-end tests (Detox, Android)

Detox runs against the `dev` flavor in debug and the `prod` flavor in release (see `.detoxrc.js`).

1. Install the **Android Emulator** package (Android Studio, SDK Manager) and create an AVD in Device Manager. The config expects one named `Pixel_API_35`.
   To use a different AVD, list yours with `emulator -list-avds` and set `avdName` in `.detoxrc.js` (`devices.emulator`).
2. Start Metro: `yarn start`
3. Build and run:

```sh
yarn detox:build:android
yarn detox:test:android
```

The native test setup lives in `android/app/src/androidTest/java/com/techcart/DetoxTest.java`.
