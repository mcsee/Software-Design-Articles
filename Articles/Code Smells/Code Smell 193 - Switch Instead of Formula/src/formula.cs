private static string GetPercentageRounds(double percentage)
{
    string dots = "🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪";
    int blueDots = (int) Math.Truncate (percentage* 10);
    int startingPoint = 10-blueDots;
    return dots. Substring(startingPoint, 10);
}
