<?

function translateFile() {
    $this->readFileToMemoy();
    $this->translateContents();
    $this->generateStatsAndSaveFileContents();  
}