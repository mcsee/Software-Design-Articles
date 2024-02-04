def planetary_properties(semi_major_axis,
                         incoming_radiation, reflected_radiation):
    Gravitational_Constant = 1.0    
    Sun_Mass = 1.0    
     orbital_period_squared = (
        (4 * math.pi**2 * semi_major_axis**3) /
        (Gravitational_Constant * Sun_Mass)
    )
    # This is related to the first computation part
    
    albedo = reflected_radiation / incoming_radiation
    # This is related to the second part
    
    # The final solution is to break the function into two
    # This is a trivial example for illustration purposes
    # Things usually get more complicated and entangled
   
    retrun orbital_period, albedo