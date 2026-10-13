# TechCart — Claude Code guide

React Native 0.78.2 (bare CLI, New Architecture + Hermes) e-commerce demo used as a **reference codebase** in a university lecture series. Students read this code; clarity beats cleverness.

## Stack
Redux Toolkit + Redux-Saga · React Navigation 7 (native-stack + bottom-tabs) · axios + axios-retry (`app/api/BaseApi`) · MMKV · react-hook-form · react-native-config (dev/qa/uat/prod flavors & schemes) · Jest + React Native Testing Library · Detox.
API: https://dummyjson.com (test login: `emilys` / `emilyspass`).

## Structure
Feature-based: `app/features/<feature>/{api,redux,saga,screens,components}` plus `constants.ts`, `validation.ts`. Shared code in `app/{api,components,contexts,navigation,redux,theme,utils}`.

## Commands
- `yarn start` · `yarn android:dev|qa|uat|prod` · `yarn ios:dev|qa|uat|prod`
- `yarn lint` · `npx tsc --noEmit` · `yarn test`
- `yarn detox:build:android && yarn detox:test:android`

## Rules
- Do not upgrade React Native or replace libraries unless explicitly asked.
- Keep the Saga pattern (`createAction` trigger → saga with `call`/`put` → slice actions). It is a teaching example.
- Strings go in the feature's `constants.ts`; colors come from `app/theme/colors.ts`.
- Never commit `.env*`, keystores or credentials.
- One logical change per commit; run lint, tsc and tests before committing.
- Current task list: `TECHCART_FIXES.md`.
