# shell.nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20  # Or the version you use
    pkgs.pnpm       # Or pkgs.nodePackages.npm if you use npm
  ];

  shellHook = ''
    echo "Nix development environment for Next.js activated ✅"
  '';
}
