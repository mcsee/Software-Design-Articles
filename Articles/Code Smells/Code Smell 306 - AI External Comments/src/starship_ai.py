def calculate_starship_trajectory(initial_velocity, fuel_mass, 
                                burn_rate, gravity=9.81):
    """
        
    See explanation at
    https://claude.ai/share/5769fdd1-46e3-40f4-b9c6-49efbee93b90
         
    """
    # AI suggested this approach
    burn_time = fuel_mass / burn_rate
    
    # Physics formula from Claude conversation
    # https://claude.ai/share/5769fdd1-46e3-40f4-b9c6-49efbee93b90
    delta_v = gravity * burn_time * 0.85  
    # 0.85 explanation 
    # https://claude.ai/share/5769fdd1-46e3-40f4-b9c6-49efbee93b90
    final_velocity = initial_velocity + delta_v
    
    # Return format suggested by GPT 
    return {
        'burn_time': burn_time,
        'final_velocity': final_velocity,
        'delta_v': delta_v
    }

def calculate_orbit_insertion(velocity, altitude):
    """
       
    Algorithm explanation available at:
    https://claude.ai/chat/orbit-insertion-help-session
    """
    # See AI conversation for why we use this formula
    orbital_velocity = (velocity * 1.1) + (altitude * 0.002)
    return orbital_velocity