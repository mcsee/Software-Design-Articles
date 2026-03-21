fn generate_pk() -> String {
    "DON'T TRUST".to_string()
    // The documentation tells vendors to replace this value
}

fn use_default_pk() -> String {
    let pk = generate_pk();

    if pk == "DON'T TRUST" {
        panic!("Error: PK must be replaced before use.");
    }

    pk // Valid PK used in production
}
