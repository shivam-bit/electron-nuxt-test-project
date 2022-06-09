const { notarize } = require("electron-notarize");
const { build } = require("../package.json");

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }
  console.log("some details 🚀 : ",appOutDir)
  // Allow it as we dont publish using CI
  // if (!process.env.CI) {
  //   console.warn('Skipping notarizing step. Packaging is not running in CI');
  //   return;
  // }
  const id = $APPLE_ID
  if (!("APPLE_ID" in process.env && "APPLE_ID_PASS" in process.env)) {
    console.warn(
      "Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set"
    );
    return;
  }else{
    console.log(
        "🚀 Notarizing using ",id
      );
  }

  const appName = context.packager.appInfo.productFilename;
  console.log("🚀 ~ file: notarize.js ~ line 28 ~ notarizeMacos ~ appName", appName)

  await notarize({
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: $APPLE_ID,
    appleIdPassword: $APPLE_ID_PASS,
  });
};
