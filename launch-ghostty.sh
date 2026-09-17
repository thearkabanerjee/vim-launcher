#!/bin/zsh
set -e

NVIM="/opt/homebrew/bin/nvim"
GHOSTTY="/Applications/Ghostty.app/Contents/MacOS/ghostty"

if [[ ! -x "$NVIM" ]]; then
  NVIM="/usr/local/bin/nvim"
fi

if [[ ! -x "$NVIM" ]]; then
  echo "Neovim not found."
  exit 1
fi

if [[ ! -x "$GHOSTTY" ]]; then
  echo "Ghostty not found."
  exit 1
fi

exec "$GHOSTTY" -e "$NVIM"
