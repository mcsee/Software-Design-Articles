
def calculate_starship_trajectory(initial_velocity, fuel_mass, 
                                burn_rate, gravity=9.81):
  
    THRUST_EFFICIENCY = 0.85
    
    burn_time = fuel_mass / burn_rate
    delta_v = gravity * burn_time * THRUST_EFFICIENCY
    # You replace the magic number
    final_velocity = initial_velocity + delta_v
    
    return {
        'burn_time': burn_time,
        'final_velocity': final_velocity,
        'delta_v': delta_v
    }

def calculate_orbit_insertion(velocity, altitude):
    """Calculate orbit insertion velocity."""
    
    VELOCITY_BOOST_FACTOR = 1.1
    ALTITUDE_ADJUSTMENT_RATE = 0.002

    orbital_velocity = (velocity * VELOCITY_BOOST_FACTOR) +
      (altitude * ALTITUDE_ADJUSTMENT_RATE)
    return orbital_velocity    

import unittest
from starship_trajectory_calculator import (
    calculate_starship_trajectory, calculate_orbit_insertion
)

class TestStarshipTrajectoryCalculator(unittest.TestCase):
    
    def test_basic_trajectory_calculation(self):
        result = calculate_starship_trajectory(100, 1000, 10)
        
        self.assertEqual(result['burn_time'], 100.0)
        self.assertEqual(result['delta_v'], 833.85)
        self.assertEqual(result['final_velocity'], 933.85)
    
    def test_zero_fuel_scenario(self):
        result = calculate_starship_trajectory(200, 0, 10)
        
        self.assertEqual(result['burn_time'], 0.0)
        self.assertEqual(result['delta_v'], 0.0)
        self.assertEqual(result['final_velocity'], 200.0)
    
    def test_high_burn_rate(self):
        result = calculate_starship_trajectory(150, 500, 100)
        
        self.assertEqual(result['burn_time'], 5.0)
        self.assertAlmostEqual(result['delta_v'], 41.69, places=2)
        self.assertAlmostEqual(result['final_velocity'], 191.69, 
                             places=2)
    
    def test_custom_gravity(self):
        result = calculate_starship_trajectory(100, 600, 20, 
                                             gravity=3.71)  # Mars
        
        self.assertEqual(result['burn_time'], 30.0)
        self.assertAlmostEqual(result['delta_v'], 94.76, places=2)
        self.assertAlmostEqual(result['final_velocity'], 194.76, 
                             places=2)
    
    def test_orbit_insertion_basic(self):
        orbital_velocity = calculate_orbit_insertion(7800, 400000)
        
        self.assertEqual(orbital_velocity, 9380.0)
    
    def test_orbit_insertion_low_altitude(self):
        orbital_velocity = calculate_orbit_insertion(7500, 200000)
        
        self.assertEqual(orbital_velocity, 8650.0)
    
    def test_orbit_insertion_zero_altitude(self):
        orbital_velocity = calculate_orbit_insertion(8000, 0)
        
        self.assertEqual(orbital_velocity, 8800.0)