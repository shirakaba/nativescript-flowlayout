# nativescript-flowlayout

## Prerequisites

Set up your [environment](https://docs.nativescript.org/setup/macos#setting-up-macos-for-ios) for NativeScript development. If you have developed React Native or pure native apps before, you may have already done some of the steps.

The main NativeScript-specific step is `npm install -g nativescript`, which globally installs the NativeScript CLI, `ns`.

## Running

```sh
# Install the monorepo's JavaScript dependencies.
npm install

# Run the app.
cd apps/demo
ns run ios --no-hmr
```

Right now, the app is rigged up to run the test suite in `apps/demo/src/test/insertion.ts`. A single test is marked as `test.only` to focus on that while I try to find any way to get text attachments to behave properly.

The action is in `apps/demo/src/dom/inline-block.ts`, and the problem is that on the `AttachmentViewProvider` class, neither the `loadView()` nor the `attachmentBoundsForAttributesLocationTextContainerProposedLineFragmentPosition()` methods get called. Basically I'm just trying to see any sign of life.
