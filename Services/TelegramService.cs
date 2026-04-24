using Telegram.Bot;
using Telegram.Bot.Types;
using System.IO;

namespace DossoChat26.Services
{
    public class TelegramService
    {
        private readonly ITelegramBotClient _botClient;
        private const string _botToken = "8717148646:AAECDfIlU6Ff4wcAq_yaKWj3h5ajQdoA2Io";
        private const string _channelId = "-1003950583172";

        public TelegramService()
        {
            _botClient = new TelegramBotClient(_botToken);
        }

        public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
        {
            var inputFile = InputFile.FromStream(fileStream, fileName);
            // Eğer dosya resmiyse sendPhoto kullanabilirsiniz ancak sendDocument her şeyi orijinal kalitede gönderir.
            var message = await _botClient.SendDocument(_channelId, inputFile);
            return message.Document.FileId;
        }

        public async Task<string> GetDownloadUrl(string fileId)
        {
            var file = await _botClient.GetFile(fileId);
            return $"https://api.telegram.org/file/bot{_botToken}/{file.FilePath}";
        }
    }
}