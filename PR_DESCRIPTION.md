# Reference cleanup: environments, auth, signing, Detox and tests

Makes TechCart build, run and behave the way the lectures describe, without modernising it into a different app. React Native stays on 0.78.2 and no library is swapped. The Saga pattern is unchanged.

Base: tag `v2025` (`main`). 14 tasks from `TECHCART_FIXES.md`, 7 "Must fix" and 7 "Should fix".

## Status key
- ✅ verified by the method listed
- ⚠️ built and unit-tested, but not yet run on a device. Covered by `MANUAL_TEST_CHECKLIST.md`

## Must fix

| # | Task | Commit | Status | How it was verified |
|---|------|--------|--------|---------------------|
| 1 | Environment config | `ec943e5` | ⚠️ | Dev and QA debug APKs build. `BuildConfig.API_BASE_URL` per variant read back from the generated files. Changing `.env.qa` changed only the QA build. Login and product load **not run on a device** |
| 2 | iOS configs and schemes | `4940696`* | ✅ | `pod install` clean. All four schemes build with `xcodebuild` for the simulator. Built `Info.plist` shows the right app name and bundle id per scheme. Each configuration's `libreact-native-config.a` embeds its own env file (`ENABLE_LOGGING` differs per scheme) |
| 3 | `patch-package` | `1c04ddb` | ✅ | `rm -rf node_modules && yarn install` succeeds, `patch-package` binary present |
| 4 | Auth token, user restore | `4940696`* | ⚠️ | Saga unit tests: login sets the header and persists the user without tokens, restore returns the user and sets the header, logout clears both. Restore on a device not run |
| 5 | Release signing | `d509b74` | ✅ | `assembleProdRelease` without properties prints the warning, `apksigner` shows `CN=Android Debug`. With a throwaway keystore passed via `-P`, it shows the new certificate |
| 6 | Detox config | `b29ae95` | ⚠️ | `yarn detox:build:android` succeeds and writes `app-dev-debug.apk`. Test APK targets `com.techcart.dev`. `assembleProdRelease` + `assembleProdReleaseAndroidTest` also build. `detox test` not run |
| 7 | E2E test bugs | `e92b325` | ⚠️ | Original saved to `e2e/exercises/signIn.buggy.test.js`. `jest --listTests` with the Detox config lists only `signIn.test.js`. Syntax checked. Not run on an emulator |

\\* Part of one combined commit, see "History" below.

## Should fix

| # | Task | Commit | Status | How it was verified |
|---|------|--------|--------|---------------------|
| 8 | Move `search/` into `app/features/search/` | `67e76cb` | ✅ | `tsc` and tests unchanged |
| 9 | `SafeAreaView` from `react-native-safe-area-context` | `2ee9548` | ✅ | `tsc`, tests. Visual check pending |
| 10 | Home: native-stack types, typed `renderItem`, one state at a time | `8257816` | ⚠️ | `tsc` error for Home removed. `@react-navigation/stack` was unused and is removed. Error/retry on a device pending (F8) |
| 11 | ProductDetails by id, Cart images | `c1d4df2` | ⚠️ | New saga unit tests (success, failure, id passed through). Fields used by the screen checked against the live `GET /products/:id` response. Visual check pending |
| 12 | `.eslintrc.js` | `f72bcf8` | ✅ | `yarn lint` runs for the first time: 0 errors, 6 warnings in files not touched here |
| 13 | Remove `@testing-library/jest-native` | `be3d606` | ✅ | `yarn test` passes. The snapshot did not change for this task |
| 14 | README, header text | `899b474` | ✅ | Unit test and snapshot updated (the only snapshot diff is the header line). README sections reviewed |

## Result of the checks

| | `v2025` baseline | This branch |
|---|---|---|
| `yarn test` | 4 failed | **8 passed** |
| `yarn lint` | crashed (invalid config) | 0 errors, 6 warnings |
| `npx tsc --noEmit` | 3 errors | 1 error (`Search.tsx`, dummy data) |
| `yarn install` from scratch | failed | succeeds |

## Things a reviewer should know

- **`react-native-config` on Android needs an override.** Re-enabling it made CMake fail, because the library declares a codegen config but never generates its native output. `react-native.config.js` stays, but now only skips its native linking on Android. The Java module that reads `.env` is still linked.
- **iOS configurations were empty stubs.** The target-level and project-level `Debug-Dev/QA/UAT` configurations had no settings (not even `SDKROOT`), so Xcode only offered macOS destinations. They are now filled from `Debug`, and `Release-Dev/QA/UAT` were added. The Podfile also declares the `Debug-*` names as debug-type so the Pods get `DEBUG=1`.
- **`fmt` workaround for Xcode 26.4.** `fmt 11.0.2` does not compile under Xcode 26 with C++20. The `fmt` pod alone is built as C++17 in the Podfile `post_install`. This is not part of the task list and can be dropped if you build with an older Xcode.
- **Root `jest.config.js` now ignores `e2e/`.** Without that, `yarn test` also ran the Detox files and failed.
- **Cart images:** dummyjson has no iPhone 14 or 15, so the items keep their names and use the iPhone 13 Pro and iPhone X thumbnails.
- **Env files** (`.env*`) stay ignored. `.env.example` is committed.
- **README:** the intro said RN 0.80.1, the table said 0.78.2. Fixed. Its code fence was unclosed. Fixed.
- **Known, out of scope:** Home still greets "John!" with a hardcoded cart badge, Cart and Search use dummy data, `e2e/exercises/signIn.buggy.test.js` still asserts the old "Practical Test" text (it is a copy of the original).

## History

Commit `4940696` ("Build Varient Configs: iOS") was made while the iOS work was in progress and contains tasks 2 and 4, the `fmt` workaround, the saga test and the two docs, instead of one commit per task. `31a6f30` and its revert `cab13b8` are a mistaken commit and its undo: net effect on the tree is zero.

## Not done

Not pushed, not tagged `v2026-reference`.
