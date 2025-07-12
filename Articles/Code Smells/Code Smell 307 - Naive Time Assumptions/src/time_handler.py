import pytz
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from zoneinfo import ZoneInfo

class TimeHandler:
    def __init__(self, timezone='UTC'):
        self.timezone = ZoneInfo(timezone)
    
    def add_business_days(self, start_date, days):
        """Add business days accounting for timezone and DST"""
        if not start_date.tzinfo:
            start_date = start_date.replace(tzinfo=self.timezone)
        
        result = start_date
        days_added = 0
        
        while days_added < days:
            result += timedelta(days=1)
            # Skip weekends
            if result.weekday() < 5:
                days_added += 1
        
        return result
    
    def get_monthly_report_date(self, year, month):
        """Get last day of month safely"""
        next_month = datetime(year, month, 1, 
             tzinfo=self.timezone) + relativedelta(months=1)
        return next_month - timedelta(days=1)
    
    def calculate_age(self, birth_date):
        """Calculate age accounting for leap years"""
        if not birth_date.tzinfo:
            birth_date = birth_date.replace(tzinfo=self.timezone)
        
        today = datetime.now(self.timezone)
        return relativedelta(today, birth_date).years
    
    def schedule_meeting(self, base_time, target_timezone):
        """Schedule meeting with proper timezone handling"""
        if not base_time.tzinfo:
            base_time = base_time.replace(tzinfo=self.timezone)
        
        target_tz = ZoneInfo(target_timezone)
        return base_time.astimezone(target_tz)
    
    def is_same_day(self, time1, time2, timezone):
        """Compare dates in specific timezone"""
        tz = ZoneInfo(timezone)
        local_time1 = time1.astimezone(tz)
        local_time2 = time2.astimezone(tz)
        return local_time1.date() == local_time2.date()