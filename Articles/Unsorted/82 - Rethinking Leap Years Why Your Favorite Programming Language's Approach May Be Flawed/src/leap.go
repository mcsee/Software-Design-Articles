package main

import (
  "fmt"
  "time"
)

func isLeapYear(year int) bool {
  return year%4 == 0 && (year%100 != 0 || year%400 == 0)
}