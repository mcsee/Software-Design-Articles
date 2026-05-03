func calculatePrice(items: [Double], taxRate: Double) -> Double {
    items.reduce(0) { $0 + $1 } * (1 + taxRate / 100)
    // If you aren't familiar to swift 
    // you can't understand what is returning
}