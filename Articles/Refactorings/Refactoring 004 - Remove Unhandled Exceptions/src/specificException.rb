class RangeNotSatisfiedException < StandardError
end

begin
    raise RangeNotSatisfiedException.new "Range must be betweet 0 and 10"
rescue RangeNotSatisfiedException => e
    puts e.message 
    puts e.exception_type 
end

