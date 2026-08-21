Model A (builder): write the pull request for the new caching
layer from the attached spec. Don't approve your own diff.

Model B (verifier, different vendor than Model A): review the
diff looking only for defects. Reject it if you find any, and
explain exactly what's wrong. Don't fix it yourself.

Route 10% of every batch of merged pull requests, chosen at
random, to a human reviewer. Log every case where the human
overrides Model B's verdict, in either direction.

Keep track of the defects found by a human reviewer
