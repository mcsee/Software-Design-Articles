// This case is not exactly what happened with Crowdstrike
// It is here for illustration purposes
void* get_data() {
  if (data_available) {
    return data_ptr;  // This could be null!
  } else {
    // Uh oh, what if data_ptr is null here?
    return NULL;  
    // Using Null to indicate no data
    // knowing Null is schizophrenic
  }
}

int process_data(void* data) {
  if (data != NULL) { 
    // Maybe a null check, but not guaranteed!
    // Accessing data... (crash if data is Null)
    return *data;
  }
  // No check? Silent failure or unexpected behavior.
  return -1;
}