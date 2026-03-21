<?

if (isOpen(file) & size(contents(file)) > 0)
  // It performs a full evaluation since it is the bitwise AND
  // will fail since you can't retrieve contents
  // from a file that is not open