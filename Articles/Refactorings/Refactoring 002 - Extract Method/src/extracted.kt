object Ingenuity {   
    //1. Move the code fragment to a separate new method 
    private fun takeOff() {
        raiseTo(10 feet)
    }
    
    //1. Move the code fragment to a separate new method 
    private fun moveForwardToPerseverance() {
       while (distanceToPerseverance() < 5 feet) {
             moveForward()             
         }
    }
    
    //1. Move the code fragment to a separate new method 
    private fun land() {
        raiseTo(0 feet)
    }
    
    fun moveFollowingPerseverance() {
        takeOff()
        //2. Replace the old code with a call to the recently created method.
        moveForwardToPerseverance()
        //2. Replace the old code with a call to the recently created method.
        land()
        //2. Replace the old code with a call to the recently created method.
    }
}