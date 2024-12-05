import { PluginOption } from "vite";
import meta, {
  EditorFeature,
  EditorLanguage,
  IFeatureDefinition,
} from "monaco-editor/esm/metadata.js";
import path from "path";
import fs from "fs";

type PluginConfig = {
  targetFile: string;
  monacoLib: string;
  languages: (EditorLanguage | string)[];
  features: (EditorFeature | string)[];
  optimize: boolean;
};
type UserConfig = Partial<PluginConfig>;

const createCode = ({
  languages,
  features,
  monacoLib,
}: {
  languages: string[];
  features: string[];
  monacoLib: string;
}) => {
  const lines: string[] = [];
  const attachEntry = (features: IFeatureDefinition[], allowed: string[]) => {
    features.forEach((it) => {
      lines.push(`// ${it.label}`);
      const include = allowed.includes(it.label) || allowed.includes("*");
      if (include) {
        const entries = Array.isArray(it.entry) ? it.entry : [it.entry];
        entries.forEach((entry) => {
          lines.push(`import "${monacoLib}/esm/${entry}.js";`);
        });
      }
      return lines;
    });
  };
  attachEntry(meta.features, features);
  lines.push(
    `export * as monaco from "${monacoLib}/esm/vs/editor/editor.api.js";`
  );
  attachEntry(meta.languages, languages);
  return lines.join("\n");
};

export const monacoPlugin = (userConfig: UserConfig = {}): PluginOption => {
  const {
    targetFile = "./src/monaco.ts",
    monacoLib = "monaco-editor",
    languages = ["json", "javascript"],
    features = ["browser"],
    optimize = true,
  } = userConfig;
  return {
    name: "vite-plugin-monaco",
    enforce: "pre",
    config: (config) => {
      const fileName = path.resolve(config.root || ".", targetFile);
      const dirName = path.dirname(fileName);
      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
      }
      const code = createCode({ features, languages, monacoLib });
      fs.writeFileSync(fileName, code, {});
      if (optimize) {
        config.optimizeDeps = config.optimizeDeps || {};
        config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
        config.optimizeDeps.exclude.push("monaco-editor");
      }
      return config;
    },
  };
};

export const monaco = monacoPlugin;

export default monacoPlugin;
