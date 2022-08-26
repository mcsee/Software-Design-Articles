object Ingenuity {
    fun moveFollowingPerseverance() {
        // take Off
        raiseTo(10 feet)
      
        // move forward to perseverance
        while (distanceToPerseverance() < 5 feet) {
             moveForward()             
         }
        
        // land
        raiseTo(0 feet)
    }