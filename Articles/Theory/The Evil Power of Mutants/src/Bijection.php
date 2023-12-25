<?

$day12 = new Day(12);
$year2020 = new Year(2020);
$may2020 = new YearMonth(5, $year2020);
$halvingDay = new Date($day12, $may2020);
$halvingTransaction = new 
  Movement($wallet, $destination, $bitcoins, $halvingDay);