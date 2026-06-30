def test_draw_gives_one_point_each():
    ecuador = Team("Ecuador 🇪🇨")
    curacao = Team("Curaçao 🇨🇼")

    match = Match(ecuador, curacao, home_goals=0, away_goals=0)
    standings = GroupStandings()
    standings.record(match)

    assert standings.points_for(ecuador) == 1
    assert standings.points_for(curacao) == 1
