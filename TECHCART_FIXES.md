# TechCart — Reference Cleanup

TechCart is a **teaching reference codebase** for the UoM FIT cross-platform mobile development lecture series. Goal of this work: make it build, run and behave the way the lectures describe it, **without** modernising it into a different app.

## Ground rules

- Do **not** upgrade React Native (stay on 0.78.2) or swap libraries unless a task below says so.
- Before any change: `git tag v2025` on the current `main`, then work on branch `fix/reference-cleanup`.
- One task = one commit, message format: `fix(<area>): <what>` (e.g. `fix(env): load react-native-config on Android`).
- After each task run: `yarn lint`, `npx tsc --noEmit`, `yarn test`. Report anything that was already failing before your change separately from anything you introduced.
- Never commit `.env*` files, keystores or passwords. Add `.env.example` files instead.
- If a task needs a decision not covered here, stop and ask.

---

## Must fix

### 1. Environment config is not actually used
Symptoms:
- `react-native.config.js` disables `react-native-config` autolinking on Android.
- `apply from: ... dotenv.gradle` is commented out in `android/app/build.gradle`.
- `app/api/axiosInstance.ts` reads `Config.API_BASE_URL`; `.env*` files define `API_URL`.
- `auth.api.ts` and `home.api.ts` hardcode `https://dummyjson.com/...` and bypass `BaseApi`.
- `.env.qa` is empty. `SignIn.tsx` reads `Config.API_URL` and never uses it.

Do:
- Re-enable react-native-config on Android following its docs for product flavors (`envConfigFiles` keys are lowercase `<flavor><buildType>`, e.g. `devdebug`). Remove the Android override in `react-native.config.js`.
- Standardise on **one** key: `API_BASE_URL=https://dummyjson.com`. Update all `.env*` files and add `.env.example`.
- Refactor `AuthApi` and `HomeProductApi` to extend/use `BaseApi` with relative endpoints (`/auth/login`, `/products`).
- Remove unused `Config` reads.

Done when: `yarn android:dev` and `yarn android:qa` both log in and load products, and changing `API_BASE_URL` in one env file changes that variant only.

### 2. iOS environment/scheme config is broken
- `ios/Podfile` `ENVIRONMENTS` uses single strings like `"Debug QA Realeae QA"` (typo + should be an array `["Debug QA", "Release QA"]`). Same for UAT.
- There is no shared `TechCart Dev` scheme, but `yarn ios:dev` expects one.

Do: fix the Podfile config arrays; make sure Xcode build configurations with those exact names exist; add a shared `TechCart Dev` scheme mirroring the QA one. Verify `pod install` succeeds and each scheme resolves its own `.env.*`.

Done when: `yarn ios:dev`, `ios:qa`, `ios:uat`, `ios:prod` each build and show the correct app name.

### 3. Fresh install fails (`postinstall: patch-package`)
`patch-package` is not a dependency and there is no `patches/` folder.

Do: add `patch-package` as a devDependency and create `patches/README.md` explaining the workflow (edit in `node_modules` → `npx patch-package <pkg>` → commit the patch). Do not invent a patch.

Done when: `rm -rf node_modules && yarn install` succeeds.

### 4. Auth token is never attached; session restore loses the user
- `setAuthHeader` is never called.
- `restoreSessionSaga` dispatches `user: null`; Profile shows hardcoded "John Doe".

Do:
- Call `setAuthHeader` after login and after restore.
- Persist the user object (MMKV, JSON) on login, restore it on launch, clear it on logout.
- Profile reads name/email/avatar from the auth state.
- Keep the existing saga style (`call`, `put`, `takeLatest`) — this file is used as the Saga teaching example.

### 5. Release builds are signed with the debug key
`buildTypes.release` uses `signingConfigs.debug`.

Do: use `signingConfigs.release` when `MYAPP_UPLOAD_STORE_FILE` (and related) properties exist in `~/.gradle/gradle.properties`, otherwise fall back to debug **with a clear Gradle warning**. Document the setup in README ("Release signing"). Never commit a keystore.

### 6. Detox config does not match the flavors
With flavors, `assembleDebug` outputs `app-dev-debug.apk` etc., not `app-debug.apk`.

Do: point Android Detox apps at the `dev` flavor (`assembleDevDebug assembleDevDebugAndroidTest -DtestBuildType=debug`, binary `app/build/outputs/apk/dev/debug/app-dev-debug.apk`), same for release with `prod`. Update the AVD name to something generic and document how to change it. Check `androidTest` DetoxTest setup exists per Detox docs.

### 7. E2E test bugs (`e2e/signIn.test.js`)
Known bugs: elements wrapped twice (`element(usernameInput)` where it is already an element); both values typed into the password field; the "toggle password" test taps `forgotPasswordButton`; first test calls `expect` without `await`.

Do: fix them, and add `testID="togglePasswordButton"` usage in the toggle test (it already exists in `SignIn.tsx`). **Before fixing**, copy the original to `e2e/exercises/signIn.buggy.test.js` (excluded from the Detox `testMatch`) — it is used as a "find the bugs" class exercise.

---

## Should fix (small, keep diffs minimal)

8. Move `search/` into `app/features/search/` and update imports.
9. Replace `SafeAreaView` from `react-native` with `react-native-safe-area-context` in Cart, ProductDetails, Profile, Search.
10. Home: use `NativeStackNavigationProp` from `@react-navigation/native-stack`; remove `@react-navigation/stack` if unused; type `renderItem`; add `dispatch` to the `useEffect` deps; show either loading, error (with `onRetry`) or the list — not all three stacked.
11. ProductDetails: fetch by `productId` (`/products/:id`) through a small service + saga, replace hardcoded iPhone/lorem content. Cart: fix invalid image strings (use product thumbnails from dummyjson). Keep cart in local state — it is out of scope to move it to Redux.
12. `.eslintrc.js`: remove the invalid top-level `files` key; use an `overrides` entry for `e2e/**` with Detox/Jest globals.
13. Testing libs: remove `@testing-library/jest-native` and its `setupFilesAfterEnv` entry (RNTL ships matchers). Update the snapshot.
14. README: correct RN version (0.78.2), remove the "Encrypted Storage" claim (MMKV here is not encrypted — add a note that tokens belong in Keychain/Keystore), add an "Environments" and "Running tests" section. SignIn header text: "Practical Test" → "TechCart" (update unit + E2E tests accordingly).

## Out of scope
RN upgrade, Expo migration, new features, restyling, replacing Saga/axios/MMKV.

## Finish
- Push branch, open a PR description listing every task with ✅ and how it was verified.
- Tag the merged result `v2026-reference`.
