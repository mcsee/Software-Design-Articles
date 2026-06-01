<?

public function testNoNewStarsAppeared(): void
  {
     $expectedStars = $this->historicStarsOnFrame();
     $observedStars = $this->starsFromObservation();
     // These sentences get a very large collection
  
     $this->assertEquals($expectedStars, $observedStars);
     // If something fails you'll have a very hard time debugging
    }