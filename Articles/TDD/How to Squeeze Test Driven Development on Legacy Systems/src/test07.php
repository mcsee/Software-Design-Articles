<?

function test07MultipleRelatedPatternsSimplifyTwoOfThem() {
    $this->assertEquals(['Arcade Fire', 'Radiohead', 'Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['Arcade Fire',
             'Radiohead.',
             'Radiohead',
             'Sigur Ros',
             'Sigur']));
}
