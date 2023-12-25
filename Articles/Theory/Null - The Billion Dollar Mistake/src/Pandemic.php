<?

final class City {
   public function interactionBetween($somePerson, $anotherPerson) {
       if ($this->meetingProbability() < random()) {
           return null; // no interaction       
       } else {
           return new PersonToPersonInteraction($somePerson, $anotherPerson);
       }
    }
}

final class PersonToPersonInteraction {
   public function propagate($aVirus) {
       if ($this->somePerson->isInfectedWith($aVirus) 
           && $aVirus->infectionProbability() > random()) {
           $this->anotherPerson->getInfectedWith($aVirus);
       }
   }
}

$covid19 = new Virus();
$janeDoe = new Person();
$johnSmith = new Person();
$wuhan = new City();

$interaction = $wuhan->interactionBetween($johnSmith, $janeDoe);
if ($interaction != null) {
    $interaction->propagate($covid19);
}

/* In this example we modeled the interaction 
between an infected person and a healthy one.
Jane is healthy but might be infected 
if Virus R0 applies to her. */