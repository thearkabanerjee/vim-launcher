const fs = require("fs");
const path = require("path");

module.exports = async (forgeConfig, options) => {
  if (process.platform !== "darwin") {
    return;
  }

  const appPath = options.outputPaths?.find((p) =>
    p.endsWith(".app")
  );

  if (!appPath) {
    console.log("Could not find packaged macOS app.");
    return;
  }

  const sourceIcon = path.join(__dirname, "icon.icns");
  const targetIcon = path.join(
    appPath,
    "Contents",
    "Resources",
    "electron.icns"
  );

  fs.copyFileSync(sourceIcon, targetIcon);

  console.log("✓ Custom icon installed:", targetIcon);
};