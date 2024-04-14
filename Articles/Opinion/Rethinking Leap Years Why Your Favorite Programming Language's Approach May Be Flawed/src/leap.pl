use Time::Piece;
my $yearNumber = 2024;
my $isLeap = Time::Piece
  ->strptime("$yearNumber-01-01", "%Y-%m-%d")->leapyear;