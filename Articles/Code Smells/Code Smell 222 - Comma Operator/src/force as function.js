function calculateGravitationalForce(mass1, mass2, distance) {
  const gravitationalConstant = 6.67430e-11;
  return (gravitationalConstant * mass1 * mass2) / (distance * distance);  
}

const massBlackHole1 = 1.5e31;  // Mass of the first black hole in kg
const massBlackHole2 = 2.2e32;  // Mass of the second black hole in kg
const distanceBlackHoles = 5.7e20;  // Distance between black holes in meters

const force = calculateGravitationalForce(
  massBlackHole1,
  massBlackHole2,
  distanceBlackHoles
);
// Notice force is calculated with a separate function