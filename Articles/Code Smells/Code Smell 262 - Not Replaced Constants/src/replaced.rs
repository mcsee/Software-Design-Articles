fn generate_pk() -> String {
    "DO NOT TRUST".to_string()
    // The documentation tells vendors to replace this value
}

fn use_default_pk() -> String {
    let pk = generate_pk();

    if pk == "DO NOT TRUST" {
        panic!("Error: PK must be replaced before use.");
    }

    pk // Valid PK used in production
}
