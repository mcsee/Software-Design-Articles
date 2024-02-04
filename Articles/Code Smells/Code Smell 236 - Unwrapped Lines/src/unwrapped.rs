struct ExtraterrestrialSignal { signal_frequency: f64, signal_strength: f64, signal_duration: f64, }

fn perform_signal_processing_and_analysis(extraterrestrial_signal: &ExtraterrestrialSignal,
) {
    println!(
        "Extraterrestrial Signal processed - Frequency: {} Hz, Strength: {}, Duration: {} seconds", extraterrestrial_signal.signal_frequency,  extraterrestrial_signal.signal_strength, extraterrestrial_signal.signal_duration);

    if extraterrestrial_signal.signal_strength > 0.8 && extraterrestrial_signal.signal_duration > 10.0
    {
        println!("Potential Extraterrestrial Signal of interest!");
    } else {
        println!("Signal does not meet criteria for further investigation.");
    }
}