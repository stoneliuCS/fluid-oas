{
  description = "A very basic flake";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };
  outputs = { self, nixpkgs }: 
    let
      # Define systems you want to support
      supportedSystems = [ "x86_64-linux" "aarch64-darwin" "x86_64-darwin" ];
      
      # Helper function to generate an attrset for each system
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
      
      # Nixpkgs instantiated for each system
      nixpkgsFor = forAllSystems (system: import nixpkgs {
        inherit system;
        config = {};
        overlays = [];
      });
    in {
      # Your existing packages, extended to all supported systems
      packages = forAllSystems (system: {
        hello = nixpkgsFor.${system}.hello;
        default = self.packages.${system}.hello;
      });
      
      # Import the shell.nix for each system
      devShells = forAllSystems (system: {
        default = import ./shell.nix { pkgs = nixpkgsFor.${system}; };
      });
    };
}
