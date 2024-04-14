function Is_Leap_Year (Year : Integer) return Boolean is
begin
    return (Year mod 4 = 0 and then Year mod 100 /= 0) 
        or else (Year mod 400 = 0);
end Is_Leap_Year;