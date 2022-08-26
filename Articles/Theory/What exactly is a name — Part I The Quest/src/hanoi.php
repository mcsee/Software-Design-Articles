<?

function moveDiscs($n, $src, $dst, $aux) {
    if ($n > 1)
        moveDiscs($n - 1, $src, $aux, $dst);
    print("Move from " + $src + " to " + $dst);
    if ($n > 0)
        moveDiscs($n - 1, $aux, $dst, $src);
}