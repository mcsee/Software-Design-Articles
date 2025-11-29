let features: Vec<Feature> = load_features_from_db();
let max = 200;
assert!(features.len() <= max);
# This magic number assumption 
# is actually wrong                              
                              
for f in features {
    proxy.add_bot_feature(f.unwrap());
    # You also call unwrap() on every feature. 
    # If the database returns an invalid entry 
    # or a parsing error,
    # you trigger another panic. 
    # You give your runtime no chance to recover. 
    # You force a crash on a single bad element.
}
                              
# A quiet config expansion turns into
# a full service outage 
# because you trust input that you should validate 
# and you use failure primitives (assert!, unwrap()) 
# that kills your program 
# instead of guiding it to safety