using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using DossoChat26.Services; // Kendi namespace'ini kontrol et
using DossoChat26.Models;

public class IndexModel : PageModel
{
    private readonly TelegramService _telegramService;
    private readonly FirebaseService _firebaseService;

    public IndexModel(TelegramService telegramService, FirebaseService firebaseService)
    {
        _telegramService = telegramService;
        _firebaseService = firebaseService;
    }

    public void OnGet() { }

    // Dosya yükleme işlemini AJAX ile buradan çağıracağız
    public async Task<JsonResult> OnPostUploadToTelegram(IFormFile file)
    {
        if (file == null || file.Length == 0) return new JsonResult(new { success = false });

        using (var stream = file.OpenReadStream())
        {
            // 1. Telegram'a yükle
            var fileId = await _telegramService.UploadFileAsync(stream, file.FileName);

            // 2. İndirme Linkini Al (Telegram'dan)
            var downloadUrl = await _telegramService.GetDownloadUrl(fileId);

            return new JsonResult(new
            {
                success = true,
                fileId = fileId,
                url = downloadUrl,
                type = file.ContentType.StartsWith("image") ? "Image" : "File"
            });
        }
    }
}