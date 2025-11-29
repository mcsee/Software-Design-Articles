fn load_and_validate(max: usize) -> Result<Vec<Feature>, String> {
    let raw: Vec<Result<Feature, Error>> = load_features_from_db();
    
    if raw.len() > max {
        return Err(format!(
            "too many features: {} > {}", 
            raw.len(), max
        ));
    }
    
    Ok(raw.into_iter()
        .filter_map(|r| r.ok())
        .collect())
}
