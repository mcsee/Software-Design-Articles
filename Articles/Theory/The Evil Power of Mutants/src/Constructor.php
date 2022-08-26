<?

final class Movement {
    private $party;
    private $counterparty;
    private $amount;
    private $date;

    function __construct($aParty, $aCounterParty, $anAmount, $aDate) {
        $this->party = $aParty;
        $this->counterparty = $aCounterParty;
        $this->amount = $anAmount;
        $this->date = $aDate;
    }
}