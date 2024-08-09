// Incorrect random value without underscore
let random_value = format!("{}", generate_random_value());
setup_dns_record(
  &format!("_{}.example.com", random_value),
  "dcv.digicert.com");