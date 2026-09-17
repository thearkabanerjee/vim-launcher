const { app } = require("electron");
const { execFile } = require("child_process");
const fs = require("fs");

const NVIM_CANDIDATES = [
  "/opt/homebrew/bin/nvim",
  "/usr/local/bin/nvim",
  "/usr/bin/nvim",
];

const GHOSTTY_CANDIDATES = [
  "/Applications/Ghostty.app/Contents/MacOS/ghostty",
  `${process.env.HOME}/Applications/Ghostty.app/Contents/MacOS/ghostty`,
];

function findExecutable(candidates) {
  return candidates.find((path) => fs.existsSync(path)) || null;
}

function showError(title, message) {
  console.error(`${title}: ${message}`);

  // Keep this launcher dependency-free. We use macOS's native dialog.
  execFile("osascript", [
    "-e",
    `display dialog ${JSON.stringify(message)} with title ${JSON.stringify(title)} buttons {"OK"} default button "OK"`,
  ]);
}

app.whenReady().then(() => {
  const nvim = findExecutable(NVIM_CANDIDATES);
  const ghostty = findExecutable(GHOSTTY_CANDIDATES);

  if (!nvim) {
    showError(
      "Neovim Launcher",
      "Neovim could not be found. Install Neovim and make sure it is available at /opt/homebrew/bin/nvim or /usr/local/bin/nvim."
    );
    app.quit();
    return;
  }

  if (!ghostty) {
    showError(
      "Neovim Launcher",
      "Ghostty could not be found. Please install Ghostty in /Applications or ~/Applications."
    );
    app.quit();
    return;
  }

  // Ghostty's -e option starts a new terminal surface with the supplied
  // command. This gives us a fresh Ghostty window running a fresh Neovim
  // process instead of reusing an existing terminal.
  const child = execFile(ghostty, ["-e", nvim], {
    detached: true,
    stdio: "ignore",
  });

  child.unref();
  app.quit();
});

app.on("window-all-closed", () => {
  app.quit();
});
