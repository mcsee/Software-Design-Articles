<? 

Interface Visitable {
    public function accept($aVisitor);
}

final class Date implements Visitable {
    public function accept($aVisitor) {
        $aVisitor->visitDate($this);
    }
}

final class DateNotPresent implements Visitable {
    public function accept($aVisitor) {
        $aVisitor->visitDateNotPresent($this);
    }
}

final class AverageCalculator {
    private $count = 0;
    private $ageSum = 0;

    public function visitDate($aDate) {
        $this->count++;
        $this->ageSum += today() - $aDate;
    }

    public function visitDateNotPresent($aDate) {
    }

    public function average() {
        if ($this->count == 0)
            return 0;
        else
            return $this->ageSum / $this->count;
    }
}

function averagePatientsAge($patients) {
    $calculator = new AverageCalculator();
    foreach ($patients as $patient)
        $patient->birthDate()->accept($calculator);
    return $calculator->average();
}