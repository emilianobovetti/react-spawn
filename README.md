# react-spawn

<div align="center">
  <a href="https://user-images.githubusercontent.com/3957026/91082223-aa743e00-e648-11ea-883a-9acfcddfc8d2.gif">
    <img src="https://user-images.githubusercontent.com/3957026/91082223-aa743e00-e648-11ea-883a-9acfcddfc8d2.gif" alt="showcase">
  </a>
</div>

```bash
yarn add --dev react-spawn
# or
npm install --save-dev react-spawn
```

Add `"scripts": { "spawn": "react-spawn" }` in your `package.json`

Now `npx spawn ComponentName` will create a `ComponentName` directory in `src/components`.

With the flag `-h` you will spawn a custom hook in `src/hooks`.

## Custom template files

If a `.spawn-templates` directory exists inside your app root it'll be used in place of [default-templates](https://github.com/emilianobovetti/react-spawn/tree/master/default-templates).

Every occurrence of `__name__` in file names or in their content will be replaced with the component name.

The same applies for hook templates. Note that the directory for the hook templates needs to be called `.spawn-templates-hooks` and live in the root of the project.
