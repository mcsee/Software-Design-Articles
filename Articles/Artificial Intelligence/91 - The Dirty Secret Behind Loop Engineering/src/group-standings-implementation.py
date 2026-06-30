class Team:
    def __init__(self, name):
        self.name = name

class Match:
    def __init__(self, home, away, home_goals, away_goals):
        self.home = home
        self.away = away
        self.home_goals = home_goals
        self.away_goals = away_goals

class GroupStandings:
    def __init__(self):
        self._points = {}

    def record(self, match):
        if match.home_goals > match.away_goals:
            self._points[match.home] = 
                self._points.get(match.home, 0) + 3
            self._points[match.away] = 
                self._points.get(match.away, 0)
        elif match.away_goals > match.home_goals:
            self._points[match.away] = 
                self._points.get(match.away, 0) + 3
            self._points[match.home] = 
                self._points.get(match.home, 0)

    def points_for(self, team):
        return self._points.get(team, 0)
