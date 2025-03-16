func calculatePrice(items: [Double], taxRate: Double) -> Double {
    items.reduce(0) { $0 + $1 } * (1 + taxRate / 100)
    // If you are not familiar to swift 
    // you cannot understand what is returning
}