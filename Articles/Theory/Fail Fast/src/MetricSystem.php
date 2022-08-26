<?

$distance = 12.4; // miles
$supplyRatio = 10 ; // tons each kilometer
$neededSupply = $distance / $supplyRatio; // since units could not be mixed the should raise an error
// but the units were all floats so the engine keep working and exploded