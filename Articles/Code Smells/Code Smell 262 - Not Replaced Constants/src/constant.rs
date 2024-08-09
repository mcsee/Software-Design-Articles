fn generate_pk() -> String {
    "DO NOT TRUST".to_string()
}

// Vendor forgets to replace PK
fn use_default_pk() -> String {
    let pk = generate_pk();
    pk // "DO NOT TRUST" PK used in production
}
