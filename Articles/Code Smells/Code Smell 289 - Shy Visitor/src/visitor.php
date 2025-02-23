<?php

interface SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void;
}

class NeutronStar implements SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void {
    $visitor->visitNeutronStar($this);
  }
}

class Magnetar implements SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void {
    $visitor->visitMagnetar($this);
  }
}

class SpaceObjectRenderer implements SpaceObjectVisitor {
  // This is a concrete realization adhering to the protocol
  public function visitNeutronStar(NeutronStar $star): void {
    echo "Rendering a Neutron Star: Extremely dense and small!\n";
  }

  public function visitMagnetar(Magnetar $magnetar): void {
    echo "Rendering a Magnetar: A highly magnetic neutron star!\n";
  }

  public function visitBlackHole(BlackHole $blackHole): void {
    echo "Rendering a Black Hole: A strong gravitational pull!\n";
  }
}

class BlackHole implements SpaceObject {
  public function accept(SpaceObjectVisitor $visitor): void {
    $visitor->visitBlackHole($this);
  }
}

interface SpaceObjectVisitor {
  // Open for extension     
  public function visitNeutronStar(NeutronStar $star): void {
    // Handle neutron star
  }

  public function visitMagnetar(Magnetar $magnetar): void {
    // Handle magnetar
  }

  public function visitBlackHole(BlackHole $blackHole): void {
    // Handle black hole
  }
}