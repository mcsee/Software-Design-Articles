def planetary_properties(semi_major_axis,
                         incoming_radiation, reflected_radiation):
    Gravitational_Constant = 1.0    
    Sun_Mass = 1.0    
    # Up to here, there's a preparation
    # for the orbital period computation
    
    albedo = reflected_radiation / incoming_radiation
    # This is unrelated to the previous computation
    
    # You resume the first computation
    orbital_period_squared = (
        (4 * math.pi**2 * semi_major_axis**3) /
        (Gravitational_Constant * Sun_Mass)
    )
    retrun orbital_period, albedo