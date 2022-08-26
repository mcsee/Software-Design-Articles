public class TimeInterval
{
    public TimeInterval(DateTime from, DateTime tol)
    {
        // We shoud validate From < To
        From = from;
        To = to;
    }
}

public DinnerTable(Person guest, DateTime from, DateTime to)
{    
    Guest = guest;
    Interval = new TimeInterval(from, to);
}

// Even Better...

public DinnerTable(Person guest, Interval reservationTime)
{    
    Guest = guest;
    Interval = reservationTime;
}
