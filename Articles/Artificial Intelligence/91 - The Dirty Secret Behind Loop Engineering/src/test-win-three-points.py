def test_win_gives_three_points():
    germany = Team("Germany 🇩🇪")
    curacao = Team("Curaçao 🇨🇼")

    match = Match(germany, curacao, home_goals=7, away_goals=1)
    standings = GroupStandings()
    standings.record(match)

    assert standings.points_for(germany) == 3
    assert standings.points_for(curacao) == 0
