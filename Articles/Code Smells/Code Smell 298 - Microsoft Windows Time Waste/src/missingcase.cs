public static class WallpaperInitializer
{
    private static bool wallpaperWasDefined = false;

    public static void InitializeWallpaper()
    {
        if (wallpaperWasDefined)
        // Assume this was defined previously
        // and PLEASE DON'T use NULLs in case you hadn't    
        {
            LoadWallpaperBitmap();
            Report(WallpaperReady); // Missed if wallpaper is undefined
        }
       // No default report, causing delays
    }

    private static void LoadWallpaperBitmap()
    {
        
    }

    private static void Report(string status)
    {
        // The Asynchronous loading keeps on
    }
}