# vite-plugin-monaco

`vite-plugin-monaco` is a Vite plugin that allows you to customize and optimize the integration of Monaco Editor into your application. With this plugin, you can specify the languages, features, and other Monaco Editor settings that you want to include in the build, as well as optimize dependencies to keep your build lean.

## Installation

To install the plugin, use either npm or yarn:

```sh
npm install vite-plugin-monaco --save-dev
```

or

```sh
yarn add vite-plugin-monaco --dev
```

## Configuration Example

Here’s a simple example of how to configure the plugin in your `vite.config.js` file:

```js
import { defineConfig } from "vite";
import monaco from "vite-plugin-monaco";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        monaco: "src/monaco.ts", // Add monaco entry
      },
    },
  },
  plugins: [
    monaco({
      // Path to output the customized Monaco file
      targetFile: "./src/monaco.ts",
      // List of languages to include in the build
      languages: ["javascript", "typescript", "python"],
      // List of features to include in the build
      features: ["wordWrap", "bracketMatching", "find"],
    }),
  ],
});
```

## Output File: `"./src/monaco.ts"`

The plugin generates a `monaco.ts` file that includes only the features and languages you specified. Here is an example of the generated content:

```ts
import "monaco-editor/esm/vs/editor/contrib/clipboard/browser/clipboard.js";
// codeAction
// codeEditor
// codelens
// ...features comments

export * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";

// json
import "monaco-editor/esm/vs/language/json/monaco.contribution.js";
// abap
// apex
// ...languages comments
```

## How it Works

1. **Customized File Generation**: The plugin generates a `monaco.ts` file that includes only the specified languages and features.
2. **Optimization**: If the `optimize` option is enabled, the plugin will exclude the Monaco library (`monaco-editor`) from Vite's optimized dependencies to avoid code duplication.
3. **Integration with Vite**: The plugin integrates seamlessly with Vite's bundling system, making it easy to use in modern applications.

## Notes

- The generated `monaco.js` file only contains the specified features and languages, which can reduce the size of your application’s build.
- This plugin is useful if you need a lighter version of Monaco Editor, especially when you don’t need all the languages or features that come by default with the library.

## Contributions

If you have suggestions or improvements for the plugin, feel free to open an **issue** or submit a **pull request**.

## License

This project is licensed under the MIT License.
