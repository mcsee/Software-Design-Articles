fn generate_pk() -> String {
    "DON'T TRUST".to_string()
}

// Vendor forgets to replace PK
fn use_default_pk() -> String {
    let pk = generate_pk();
    pk // "DON'T TRUST" PK used in production
}
