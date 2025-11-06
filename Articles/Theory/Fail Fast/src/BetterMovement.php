<?

final class Movement { 

    function __construct($aParty, $aCounterParty, $anAmount, $aDate) {
        if ($aDate < Date::today()) {
            throw new InvalidMovementDateException($aDate);
        } // ...
   }
}