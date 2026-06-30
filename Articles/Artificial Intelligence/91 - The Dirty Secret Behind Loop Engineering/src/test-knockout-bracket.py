def test_group_winner_faces_different_group_runner_up():
    bracket = KnockoutBracket(completed_group_results)

    round_of_32 = bracket.round_of_32()

    assert round_of_32[0].home == group_e_standings.first_place()
    assert round_of_32[0].away == group_f_standings.second_place()
