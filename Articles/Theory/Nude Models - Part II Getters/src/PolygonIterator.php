<?

function iterator(): Iterator {
    return new ArrayIterator($this->vertices);
}