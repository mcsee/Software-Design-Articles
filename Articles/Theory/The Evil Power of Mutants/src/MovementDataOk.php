<?

class Movement {
function isDataOK(): bool {
        return !is_null($this->party) && 
                !is_null($this->counterparty) && 
                !is_null($this->amount) && 
                !is_null($this->isDataOK);
    }
}