# Patches

This folder holds [patch-package](https://github.com/ds300/patch-package) patches. They are re-applied to `node_modules` by the `postinstall` script on every `yarn install`.

There are currently **no patches**. The folder exists so `patch-package` has somewhere to look.

## Workflow

1. Edit the file you need to change directly inside `node_modules/<package>/`.
2. Generate the patch: `npx patch-package <package>`. This writes `patches/<package>+<version>.patch`.
3. Commit the patch file.

After that, `yarn install` re-applies the patch automatically.

Patches are tied to an exact package version. If you upgrade the package, re-create the patch.
