// 1. We locate setters usage
location.setX(1);

location.setY(2);

// 2. If you are setting essential properties move
// them to the constructor and remove the method
public class Point {
   public Point(int x, int y) {
        this.x = x;
        this.y = y;        
     // We remove the setters
   }

Point location = new Point(1, 2);