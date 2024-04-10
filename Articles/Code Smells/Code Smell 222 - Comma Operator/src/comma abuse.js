const gravitationalConstant = 6.67430e-11;

const massBlackHole1 = 1.5e31;  
// Mass of the first black hole in kg

const massBlackHole2 = 2.2e32;  
// Mass of the second black hole in kg

const distanceBlackHoles = 5.7e20;  
// Distance between black holes in meters

var force = (distanceSquared = distanceBlackHoles * distanceBlackHoles,
             (gravitationalConstant * massBlackHole1 * massBlackHole2) /
             distanceSquared);
// Two operations in a single statement with comma operator  