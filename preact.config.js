import { resolve } from "path";
// import * as webpack from "webpack";

export default function(config, env, helpers) {
    // Switch css-loader for typings-for-css-modules-loader, which is a wrapper
    // that automatically generates .d.ts files for loaded CSS
    helpers.getLoadersByName(config, "css-loader").forEach(({ loader }) => {
        loader.loader = "typings-for-css-modules-loader";
        loader.options = Object.assign(loader.options, {
            camelCase: true,
            banner:
                "// This file is automatically generated from your CSS. Any edits will be overwritten.",
            namedExport: true,
            silent: true
        });
    });

    // Tell webpack to refer to files relative to current location rather
    // than "/" base url -- combine this with HashRouter and no esm for
    // supporting SPA from local file URLs (necessary for Cordova webviews)
    config.output.publicPath = "";

    // Use any `index` file, not just index.js
    config.resolve.alias["preact-cli-entrypoint"] = resolve(
        process.cwd(),
        "src",
        "index"
    );

    return config;
}
