<?

  $sourceFile = 'C:\temp\source.txt';
  $destination = 'C:\temp\destination :txt';
  // The filename is simplified
  // and might come from a programmatic construction

  $copyWasSuccessful = copy($sourceFile, $destination);  
  if (!$copyWasSuccessful || !$file_exists($destination)) {
    // Don't trust the function result. Handle the postcondition error
  }
  