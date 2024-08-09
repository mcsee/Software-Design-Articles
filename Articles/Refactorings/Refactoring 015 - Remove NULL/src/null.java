public class SoccerMatch {
    private Team homeTeam;
    private Team awayTeam;
    private TimeRecord regularTime;
    private TimeRecord extraTime;

    public SoccerMatch(Team homeTeam, 
                       Team awayTeam,
                       TimeRecord regularTime, 
                       TimeRecord extraTime) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.regularTime = regularTime;
        this.extraTime = extraTime;
    }

    public int totalGoals() {
        int goals = regularTime.goals();
        // You might forget this IF check 
        // resulting in a null error
        if (extraTime != null) {
            goals += extraTime.goals();
        }
        return goals;
    }
}

class TimeRecord {
    private int goals;

    public TimeRecord(int goals) {
        this.goals = goals;
    }

    public int goals() {
        return goals;
    }
}