public String formatDate(Date date) {
    return new SimpleDateFormat("yyyy-MM-dd").format(date);
}

public void loadUserPreferences() {
    System.out.println("Loading user preferences...");
}