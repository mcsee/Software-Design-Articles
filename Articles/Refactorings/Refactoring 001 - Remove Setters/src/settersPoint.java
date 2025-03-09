public class Point {
   protected int x;
   protected int y;
  
   public Point() {
      this.x = 0;
      this.y = 0;        
   }
    
   public void setX(int x) {
      this.x = x;
   }
  
   public void setY(int y) {
      this.y = y;
  } 
}

Point location = new Point();
// At this moment, it is not clear which points represent
// It is coupled to the constructor decision.
// Might be null or some other convention

location.setX(1);
// Now you have point(1,0)

location.setY(2);
// Now you have point(1,2)