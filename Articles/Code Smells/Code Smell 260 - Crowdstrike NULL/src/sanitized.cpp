// You should ideally replace the null with a polymorphic call
// You can see the technique in related articles

std::unique_ptr<int> get_data() { 
  if (data_available) {
    return std::make_unique<int>(data_value);
  } else {
    return nullptr;  // Explicitly return nullptr
  }
}

int process_data(const std::unique_ptr<int>& data) {
  if (data) { // Check for valid pointer
    return *data;
  } else {
    // Handle no data case (e.g., return default value)
    return 0;
  }
}
