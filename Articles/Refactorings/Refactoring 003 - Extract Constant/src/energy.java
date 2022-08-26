//1. Move the constant code fragment to a constant declaration
final double LIGHT_SPEED = 300.000;

double energy(double mass) {
  //2. Replace the old code with a reference to the constant.
  return mass * LIGHT_SPEED ^ 2;
}