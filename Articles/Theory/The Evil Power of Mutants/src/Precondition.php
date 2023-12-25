<?

function __construct($aParty, $aCounterParty, $anAmount, $aDate) {
   if ($aParty == $aCounterParty) {
      throw new 
         PartyAndCounterpartyCannotBeTheSameException(
            $aParty, 
            $aCounterParty);
   }
   $this->party = $aParty;
   $this->counterparty = $aCounterParty;
   $this->amount = $anAmount;
   $this->date = $aDate;
}