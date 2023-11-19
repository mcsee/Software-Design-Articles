def calculate_area(length, width):
    return length * width

def calculate_volume(length, width, height):
    base_area = calculate_area(length, width)
    return base_area * height