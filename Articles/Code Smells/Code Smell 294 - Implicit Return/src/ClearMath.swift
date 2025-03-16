func calculatePrice(items: [Double], taxRate: Double) -> Double {
    let subtotal = items.reduce(0) { sum, item in 
        sum + item 
    }
    let taxFactor = 1 + taxRate / 100
    return subtotal * taxFactor
}