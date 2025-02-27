fun totalDistance(activity: Activity): Double {
    if (activity.type == "Running") {
        return activity.calculateDistance() 
        // Now it returns the value
    } else {
        return 0.0
    }
}