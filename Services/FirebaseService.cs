using DossoChat26.Models;
using Firebase.Database;
using Firebase.Database.Query;

public class FirebaseService
{
    private readonly FirebaseClient _firebase;
    private const string BaseUrl = "https://dossochat-default-rtdb.europe-west1.firebasedatabase.app/";

    public FirebaseService()
    {
        _firebase = new FirebaseClient(BaseUrl);
    }

    public async Task SendMessageAsync(ChatMessage msg)
    {
        await _firebase.Child("Messages").PostAsync(msg);
    }

    // Gerçek zamanlı dinleme için (Observable)
    public IObservable<FirebaseObject<ChatMessage>> SubscribeToMessages()
    {
        return _firebase.Child("Messages").AsObservable<ChatMessage>();
    }
}