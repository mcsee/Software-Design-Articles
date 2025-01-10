public String dateFormatting(Date date) {
    return new SimpleDateFormat("yyyy-MM-dd").format(date);
}

public void load() {
    System.out.println("Loading...");
}