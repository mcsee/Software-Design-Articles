from datetime import datetime, timedelta

class TimeCalculator:
    def add_business_days(self, start_date, days):
        # Assumes every day has 24 hours
        result = start_date
        for _ in range(days):
            result += timedelta(days=1)
            # Skip weekends
            while result.weekday() >= 5:
                result += timedelta(days=1)
        return result
    
    def get_monthly_report_date(self, year, month):
        # Assumes all months have 31 days
        return datetime(year, month, 31)
    
    def calculate_age(self, birth_date):
        # Ignores leap years and timezone changes
        today = datetime.now()
        return (today - birth_date).days // 365
    
    def schedule_meeting(self, base_time, timezone_offset):
        # Assumes timezone offset never changes
        return base_time + timedelta(hours=timezone_offset)
    
    def is_same_day(self, time1, time2):
        # Compares without considering timezone
        return time1.date() == time2.date()