namespace DossoChat26.Models
{
    public class ChatMessage
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string SenderId { get; set; }
        public string SenderName { get; set; }
        public string GroupId { get; set; } // Boşsa birebir mesajdır
        public string MessageText { get; set; }
        public string TelegramFileId { get; set; }
        public string DownloadUrl { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public bool IsDanger { get; set; } // Kırmızı/Bold metin
        public MessageType Type { get; set; }
    }

    public enum MessageType { Text, Image, File, Voice, VideoNote }
}