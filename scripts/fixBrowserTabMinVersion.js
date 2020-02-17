const fs = require("fs");

module.exports = function(ctx) {
    console.log(
        "Fixing browser tab minimum Android version before build from 16 to 21"
    );
    let browserTabGradleFilePath =
        ctx.opts.projectRoot +
        "/platforms/android/cordova-plugin-browsertab/scrappy_foods-BrowserTab.gradle";
    fixBrowserTabGradleFile(browserTabGradleFilePath);
};

function fixBrowserTabGradleFile(browserTabGradleFilePath) {
    fs.readFile(browserTabGradleFilePath, function read(error, fileDataBuffer) {
        if (error) {
            console.log("Failed to read file " + browserTabGradleFilePath);
            throw error;
        }

        let fileAsString = fileDataBuffer.toString();

        const isFixNeeded = fileAsString.includes("def minSdkVersion = 16");
        if (!isFixNeeded) {
            console.log("Skipping fix: Fix has already been applied");
            return;
        }

        fileAsString = fileAsString.replace(
            "def minSdkVersion = 16",
            "def minSdkVersion = 21"
        );

        fs.writeFileSync(browserTabGradleFilePath, fileAsString);

        console.log("Done applying fix");
    });
}
