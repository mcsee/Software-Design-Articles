<?

  $sourceFile = 'C:\temp\source.txt';
  $destination = 'C:\temp\destination.txt';
  $copyWasSuccessful = copy($sourceFile, $destination);
  // true
  
  $destinationFileExists = file_exists($destination); 
  // true
  
  $sourceFile = 'C:\temp\source.txt';
  $destination = 'C:\temp\destination :txt';
  // The filename is simplified 
  // and might come from a programmatic construction

  $copyWasSuccessful = copy($sourceFile, $destination); 
  // true - this is a mistake

  $destinationFileExists = file_exists($destination); 
  // false since it was not created

  $destinationChangedFileExists = file_exists('C:\temp\destination ');
  // true but unexpected  