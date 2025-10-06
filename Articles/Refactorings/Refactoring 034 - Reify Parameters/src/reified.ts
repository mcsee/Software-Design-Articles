// 2. Create a meaningful entity to group them  

class PriceRange {
  constructor(public min: Currency, public max: Currency) {
    if (min > max) {
      throw new Error(
        `Invalid price range: min (${min}) `+
        `cannot be greater than max (${max})`
      );
    }
    if (min < 0) {
      throw new Error(
        `Invalid price range: min (${min}) cannot be negative`);
    }
  }
}

class Interval {
  // 3. Add missing validation rules to fail-fast
  constructor(public start: Date, public end: Date) {
    if (start > end) {
      throw new Error(
        `Invalid date range: start (${start.toISOString()})  ` + 
        `cannot be after end (${end.toISOString()})`
      );
    }
  }
}

class HolidaySearchCriteria {
  constructor(
    public priceRange: PriceRange,
    public dateRange: Interval
  ) {}
}

function findHolidays(criteria: HolidaySearchCriteria): Holiday[] {
  // 1. Identify multiple parameters of the same type  
  // No need to call validate() - already validated in constructors
  // 4. Replace function signatures with the new entity  
  const { priceRange, dateRange } = criteria;
  // 5. Adjust all callers to pass the entity  
  // 6. Add context-specific names to improve clarity 
  
  return database.query({
    price: { $gte: priceRange.min, $lte: priceRange.max },
    startDate: { $gte: dateRange.start },
    endDate: { $lte: dateRange.end }
  });
}
 
try {
  const criteria = new HolidaySearchCriteria(
    new PriceRange(500, 1000),  // ✅ Valid
    new Inteval(
      new Date('2025-06-01'), 
      new Date('2025-06-15')
    )
  );
  
  findHolidays(criteria);
  
  // ❌ This will throw immediately
  // Great for UI and API validation
  new PriceRange(1000, 500);
  
} catch (error) {
  console.error(error.message);
}