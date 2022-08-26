<?

function verticesDo($function) {
    foreach ($this->vertices as $vertex) {
        $$function($vertex);
    }
}