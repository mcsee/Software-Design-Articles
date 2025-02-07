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

class BlackHole implements SpaceObject {
    public function accept(SpaceObjectVisitor $visitor) {
        $visitor->visitBlackHole($this);
    }
}

class SpaceObjectVisitor {
    // Open for extension 
    // You can also convert it into an interface
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