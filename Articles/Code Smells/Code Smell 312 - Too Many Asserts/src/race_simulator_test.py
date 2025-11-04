def test_set_speed():
    car = Formula1Car("Red Bull")
    car.set_speed(320)
    assert car.speed == 320, (
        f"Expected speed to be 320 km/h, "
        f"but got {car.speed} km/h"
    )

def test_accelerate():
    car = Formula1Car("Red Bull")
    car.set_speed(320)
    car.accelerate(10)
    assert car.speed == 330, (
        f"Expected speed to be 330 km/h "
        f"after accelerating by 10, "
        f"but got {car.speed} km/h"
    )

def test_brake():
    car = Formula1Car("Red Bull")
    car.set_speed(330)
    car.brake(50)
    assert car.speed == 280, (
        f"Expected speed to be 280 km/h "
        f"after braking by 50, "
        f"but got {car.speed} km/h"
    )

def test_change_tire():
    car = Formula1Car("Red Bull")
    car.change_tire("soft")
    assert car.tire == "soft", (
        f"Expected tire type to be 'soft', "
        f"but got '{car.tire}'"
    )