import calendar, datetime
try: 
  birthYear= input('Birth year:')
  birthMonth= input('Birth month:')
  birthDay= input('Birth day:')
  # you don't expect the above to fail
  
  print(datetime.date(
    int(birthYear), int(birthMonth), int(birthDay)))
except ValueError as e:
  if str(e) == 'month must be between 1 and 12': 
    print('Month ' + str(birthMonth) + 
      ' is out of range. The month must be a number between 1 and 12')
  elif str(e) == 'year {0} is out of range'.format(birthYear): 
    print('Year ' + str(birthYear) +
      ' is out of range. The year must be a number between ' +
          str(datetime.MINYEAR) + ' and ' + str(datetime.MAXYEAR))
  elif str(e) == 'day is out of range for month': 
    print('Day ' + str(birthDay) + 
      ' is out of range. The day must be a number between 1 and ' +
          str(calendar.monthrange(birthYear, birthMonth)))
