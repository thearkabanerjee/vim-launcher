# Neovim Launcher

A tiny Electron macOS app that does exactly one thing:

**Open a fresh Ghostty window running Neovim.**

Click **Neovim Launcher** → Ghostty opens → `nvim` starts.

## Requirements

- macOS
- [Ghostty](https://ghostty.org/)
- Neovim
- Node.js + npm

The launcher currently checks these common Apple Silicon/Intel locations:

```text
/opt/homebrew/bin/nvim
/usr/local/bin/nvim
/usr/bin/nvim
```

and these Ghostty app locations:

```text
/Applications/Ghostty.app
~/Applications/Ghostty.app
```

## Setup

From this directory:

```bash
npm install
```

Test it:

```bash
npm start
```

A new Ghostty window should open with Neovim.

## Build the macOS app

```bash
npm run make
```

The packaged application and DMG will be placed under:

```text
out/
```

Find the app with:

```bash
find out -name "*.app"
```

Then copy it to Applications, for example:

```bash
cp -R "out/Neovim Launcher-darwin-arm64/Neovim Launcher.app" /Applications/
```

## How it works

Electron is only acting as a launcher. It finds the Ghostty executable and runs:

```bash
ghostty -e nvim
```

Ghostty's `-e` option is specifically intended for executing a command in a new terminal surface.

The Electron process exits immediately after handing the new Ghostty process off to macOS.

## Customizing the Neovim path

If your Neovim binary lives somewhere else, add its path to `NVIM_CANDIDATES` in `main.js`.

## License

MIT
