// 1. Create a Null Object class that implements the same interface

interface TimeRecord {
    // The common protocol between the real object 
    // and the Null Object
    int goals();
}

class PlayedTimeRecord implements TimeRecord {
    // This class is suitable both to be
    // a Regular Time or an Extra Time
    private int goals;

    public PlayedTimeRecord (int goals) {
        this.goals = goals;
    }

    public int goals() {
        return goals;
    }
}

class NoExtraTime implements TimeRecord {
    public int goals() {
        // They are polymorphic
        // They don't need IF checks
        return 0;
    }
}

public class SoccerMatch {
    private Team homeTeam;
    private Team awayTeam;
    private PlayedTimeRecord regularTime;
    private TimeRecord extraTime;

    public SoccerMatch(Team homeTeam, 
                       Team awayTeam,
                       PlayedTimeRecord regularTime,
                       TimeRecord extraTime) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;        
        // There's a business rule telling
        // regular time is not optional
        // Therefore is an instance of PlayedTimeRecord
        this.regularTime = regularTime;
        this.extraTime = extraTime;
    }

    public int totalGoals() {
        // 2. Replace null checks with the polymorphic Null Object
        // No Ifs 
        // No null checks
        return regularTime.goals() + extraTime.goals();
    }
}