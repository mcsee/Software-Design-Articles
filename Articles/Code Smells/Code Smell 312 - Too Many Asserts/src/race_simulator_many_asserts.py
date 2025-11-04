def test_car_performance():
    car = Formula1Car("Red Bull")
    car.set_speed(320)
    assert car.speed == 320
    car.accelerate(10)
    assert car.speed == 330
    car.brake(50)
    assert car.speed == 280
    car.change_tire("soft")
    assert car.tire == "soft"