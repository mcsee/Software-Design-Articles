<?

final class Date{

    function __construct($aMonthDay, $aMonth) {
        if (!$aMonth->includes($aMonthDay)) {
            throw new InvalidDateException($aMonthDay, $aMonth);
        } 
        ...
}
$day30 = new Day(30);
$year2020 = new Year(2020);
$feb2020 = new YearMonth(2, $year2020);
$invalidDate = new Date($day30, $feb2020);
// will raise an exception. 
// No, It will not coerce to March,1st or do "under the rug magic" to coverup  the programmer contract violation