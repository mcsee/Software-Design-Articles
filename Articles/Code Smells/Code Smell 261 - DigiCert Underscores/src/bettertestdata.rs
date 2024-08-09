// Correct random value with underscore
let random_value = format!("_{}", generate_random_value());
setup_dns_record(&random_value, "dcv.digicert.com");