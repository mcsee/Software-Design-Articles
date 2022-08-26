# 1. Check there are no references to the empty exception class.

# 2. Replace the throw sentence with a generic one.

begin
    raise StandardError.new "Range must be betweet 0 and 10"
rescue StandardError => exception
    puts exception.message 
    puts exception.exception_type 
end