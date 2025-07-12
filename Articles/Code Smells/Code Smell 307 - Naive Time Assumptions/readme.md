# Code Smell 307 - Naive Time Assumptions

![Code Smell 307 - Naive Time Assumptions](Code%20Smell%20307%20-%20Naive%20Time%20Assumptions.jpg)

*Don't reinvent time - you are probably doing it wrong*

> TL;DR: Time is not absolute. Your code breaks when you treat it that way.

# Problems 😔

- Wrong durations
- [Timezone](https://gist.github.com/timvisee/fcda9bbdff88d45cc9061606b4b923ca) chaos
- Broken scheduling
- Date parsing [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)
- Invalid [timestamps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2077%20-%20Timestamps/readme.md)
- Global [Dates](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2039%20-%20new%20Date()/readme.md)
- Tests [Depending on Dates](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20204%20-%20Tests%20Depending%20on%20Dates/readme.md)

# Solutions 😃

1. Use solid libraries
2. Avoid [system clock trust](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20204%20-%20Tests%20Depending%20on%20Dates/readme.md)
3. Normalize all timestamps
4. Test with edge cases
5. Embrace time weirdness
6. Always include time zones
7. Check [All](https://www.nasa.gov/solar-system/moon/nasa-to-develop-lunar-time-standard-for-exploration-initiatives/) Timezones
8. [Fail-Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)
9. Treat timestamps as [Timestamps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2077%20-%20Timestamps/readme.md)

# Context 💬

You think a day has 24 hours, weeks begin on Monday, or February always has 28 days.

Your users in São Paulo get a double midnight, and your backups skip a day in Sydney.

Time illusions creep into your code when you assume it’s simple.

You build logic that fails during daylight-saving changes, leap seconds, or even when the clock drifts.

Programmers are terrible when dealing with time.

When you work with time in your applications, you face one of programming's most deceptive challenges.

Most developers start by writing simple time calculations, assuming that days always have 24 hours, months have consistent lengths, and time zones remain static.

These assumptions create bugs that surface months or years later when your application encounters real-world time scenarios.

Time handling represents a perfect example of the [Dunning-Kruger effect](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect) in programming. The more you learn about time, the more you realize how little you know.

Political decisions change time zones, leap seconds adjust atomic time, and cultural differences affect calendar systems worldwide.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/f95e04c317aaf0765a70c4bb644f772d) -->

```python
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
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d2747f6fdbcae23f74d77eb76570b501) -->

```python
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
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell when you see hardcoded time calculations, assumptions about day lengths, timezone-naive datetime operations, or custom date arithmetic.

Look for [magic numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md) like 86400 (seconds in a day), 365 (days in a year), or hardcoded timezone offsets.

Watch for datetime operations that don't specify time zones, leap year calculations using simple division, or any code that treats time as purely mathematical without considering political and physical realities.

# Tags 🏷️

- Time

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

Time in the real world is fuzzy, political, and full of exceptions.

If your program models it as linear and perfect, you introduce a mismatch to the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

That mismatch leads to bugs that are impossible to reproduce and hard to explain.

You need to represent time the way it behaves: with context, rules, and variability.

When your code assumes simplified time behavior, you break the correspondence between your program's time model and reality.

This creates [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) that appear randomly when your application encounters real-world time scenarios like daylight saving time transitions, leap years, or timezone changes.

Maintaining the bijection means respecting the true complexity of time and using established libraries that handle these edge cases correctly.

Breaking this [correspondence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)  leads to scheduling errors, incorrect age calculations, and data corruption in time-sensitive applications.

You cannot create a date from February 30th. You need to follow the [fail-fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) principle

# AI Generation 🤖

AI often assumes *new Date()* works fine. Many generated examples ignore time zones, DST changes, and even correct parsing. AI helps you repeat illusions faster.

AI code generators frequently create time-handling code with common falsehoods.

They often generate simple date arithmetic, hardcoded timezone assumptions, and naive datetime operations because these patterns appear frequently in training data.

# AI Detection 🧲

If you ask AI to "handle timezones correctly" or "avoid daylight saving [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)," it can generate better code. But it needs clear instructions. The default output is usually wrong.

AI tools can detect time handling falsehoods when you provide specific instructions about timezone awareness, leap year handling, and DST considerations.

You must explicitly ask for these checks, as AI won't automatically identify time-related assumptions.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: "Review this time handling code for common falsehoods about time. Check for timezone-naive operations, hardcoded day/month lengths, leap year assumptions, and DST handling. Suggest improvements using established time libraries and proper timezone handling."

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=%22Review+this+time+handling+code+for+common+falsehoods+about+time.+Check+for+timezone-naive+operations%2C+hardcoded+day%2Fmonth+lengths%2C+leap+year+assumptions%2C+and+DST+handling.+Suggest+improvements+using+established+time+libraries+and+proper+timezone+handling.%22%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=%22Review+this+time+handling+code+for+common+falsehoods+about+time.+Check+for+timezone-naive+operations%2C+hardcoded+day%2Fmonth+lengths%2C+leap+year+assumptions%2C+and+DST+handling.+Suggest+improvements+using+established+time+libraries+and+proper+timezone+handling.%22%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=%22Review+this+time+handling+code+for+common+falsehoods+about+time.+Check+for+timezone-naive+operations%2C+hardcoded+day%2Fmonth+lengths%2C+leap+year+assumptions%2C+and+DST+handling.+Suggest+improvements+using+established+time+libraries+and+proper+timezone+handling.%22%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=%22Review+this+time+handling+code+for+common+falsehoods+about+time.+Check+for+timezone-naive+operations%2C+hardcoded+day%2Fmonth+lengths%2C+leap+year+assumptions%2C+and+DST+handling.+Suggest+improvements+using+established+time+libraries+and+proper+timezone+handling.%22%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) | [You](https://you.com/search?q=%22Review+this+time+handling+code+for+common+falsehoods+about+time.+Check+for+timezone-naive+operations%2C+hardcoded+day%2Fmonth+lengths%2C+leap+year+assumptions%2C+and+DST+handling.+Suggest+improvements+using+established+time+libraries+and+proper+timezone+handling.%22%3A+%60%60%60python%0D%0Afrom+datetime+import+datetime%2C+timedelta%0D%0A%0D%0Aclass+TimeCalculator%3A%0D%0A++++def+add_business_days%28self%2C+start_date%2C+days%29%3A%0D%0A++++++++%23+Assumes+every+day+has+24+hours%0D%0A++++++++result+%3D+start_date%0D%0A++++++++for+_+in+range%28days%29%3A%0D%0A++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++++++%23+Skip+weekends%0D%0A++++++++++++while+result.weekday%28%29+%3E%3D+5%3A%0D%0A++++++++++++++++result+%2B%3D+timedelta%28days%3D1%29%0D%0A++++++++return+result%0D%0A++++%0D%0A++++def+get_monthly_report_date%28self%2C+year%2C+month%29%3A%0D%0A++++++++%23+Assumes+all+months+have+31+days%0D%0A++++++++return+datetime%28year%2C+month%2C+31%29%0D%0A++++%0D%0A++++def+calculate_age%28self%2C+birth_date%29%3A%0D%0A++++++++%23+Ignores+leap+years+and+timezone+changes%0D%0A++++++++today+%3D+datetime.now%28%29%0D%0A++++++++return+%28today+-+birth_date%29.days+%2F%2F+365%0D%0A++++%0D%0A++++def+schedule_meeting%28self%2C+base_time%2C+timezone_offset%29%3A%0D%0A++++++++%23+Assumes+timezone+offset+never+changes%0D%0A++++++++return+base_time+%2B+timedelta%28hours%3Dtimezone_offset%29%0D%0A++++%0D%0A++++def+is_same_day%28self%2C+time1%2C+time2%29%3A%0D%0A++++++++%23+Compares+without+considering+timezone%0D%0A++++++++return+time1.date%28%29+%3D%3D+time2.date%28%29%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

When you treat time as simple, your code lies. Time is a deeply broken concept riddled with politics, exceptions, and drift.

Respect it and never write your own date logic.

Use libraries that have spent decades fixing what you can’t even see.

Your applications will become more reliable when you respect time's true nature and use proper time handling practices from the beginning of your development process.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 39 - new Date()](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2039%20-%20new%20Date()/readme.md)

[Code Smell 246 - Expiration Date](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20246%20-%20Expiration%20Date/readme.md)

[Code Smell 194 - Missing Interval](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20194%20-%20Missing%20Interval/readme.md)

[Code Smell 204 - Tests Depending on Dates](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20204%20-%20Tests%20Depending%20on%20Dates/readme.md)

[Code Smell 77 - Timestamps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2077%20-%20Timestamps/readme.md)

# More Information 📕

[Falsehoods programmers believe about time](https://gist.github.com/timvisee/fcda9bbdff88d45cc9061606b4b923ca)

[NASA to Develop Lunar Time Standard for Exploration Initiatives ](https://www.nasa.gov/solar-system/moon/nasa-to-develop-lunar-time-standard-for-exploration-initiatives/)

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Luis Cortes](https://unsplash.com/@luiscortestamez) on [Unsplash](https://unsplash.com/photos/five-assorted-country-wall-clocks-QrPDA15pRkM)

* * *

> A day can be 23 hours. Or 25. You just forgot.

_Paul Ford_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)