<?php

class SpaceObjectVisitor {
    public function visit(SpaceObject $object) {
        if ($object instanceof NeutronStar) {
            $this->visitNeutronStar($object);
        } elseif ($object instanceof Magnetar) {
            $this->visitMagnetar($object);
        } elseif ($object instanceof BlackHole) {
            $this->visitBlackHole($object);
        } 
        // Not closed for modification
    }

    private function visitNeutronStar(NeutronStar $star) {
        // Handle neutron star observation
    }

    private function visitMagnetar(Magnetar $magnetar) {
        // Handle magnetar observation
    }

    private function visitBlackHole(BlackHole $blackHole) {
        // Handle black hole observation
    }
}