{ pkgs ? 
  let
    nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-24.05";
  in 
    import nixpkgs { config = {}; overlays = []; }
}:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    bun
    antlr4_12
  ];
}
