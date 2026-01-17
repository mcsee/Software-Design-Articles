fun totalDistance(activity: Activity): Double {
    if (activity.type == "Running") {
        activity.calculateDistance() 
        // Missing return here
    } else {
        return 0.0
    }
    // Other options are omitted for simplicity
    // Some languages raise a runtime error 
    // If the function doesn't return a value
    // of the correct type (in this case a Double)
}