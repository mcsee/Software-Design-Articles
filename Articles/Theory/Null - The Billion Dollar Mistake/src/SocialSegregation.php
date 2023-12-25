<?

Interface SocialInteraction {
    public function propagate($aVirus);
}

final class SocialDistancing implements SocialInteraction {
    public function propagate($aVirus) { 
    // Do nothing !!!!
    }
}

final class PersonToPersonInteraction implements SocialInteraction {
   public function propagate($aVirus) {
       if ($this->somePerson->isInfectedWith($aVirus) 
           && $aVirus->infectionProbability() > random()) {
              $this->anotherPerson->getInfectedWith($aVirus);
       }
   }
}

final class City {

    public function interactionBetween($aPerson, $anotherPerson) {
        return new SocialDistancing(); 
        // The cities are smart enough to implement
        // social distancing to model Person to Person interactions
    }
}

$covid19 = new Virus();
$janeDoe = new Person();
$johnSmith = new Person();
$wuhan = new City();

$interaction = $wuhan->interactionBetween($johnSmith, $janeDoe);
$interaction->propagate($covid19);

/* Jane will not be affected since the interaction
 prevents from propagating the virus */