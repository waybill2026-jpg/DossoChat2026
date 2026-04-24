// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function showContextMenu(e, msgId) {
    e.preventDefault();
    // Menü html'ini oluştur ve farenin olduğu yere koy
    let menuHtml = `
        <div id="customMenu" class="context-menu py-2" style="top:${e.pageY}px; left:${e.pageX}px">
            <div onclick="copyMsg('${msgId}')"><i class="bi bi-copy"></i> Kopyala</div>
            <div onclick="editMsg('${msgId}')"><i class="bi bi-pencil"></i> Düzenle</div>
            <div onclick="markDanger('${msgId}')" class="text-danger fw-bold"><i class="bi bi-exclamation-triangle"></i> ÖNEMLİ (Danger)</div>
            <div onclick="deleteMsg('${msgId}')" class="text-danger"><i class="bi bi-trash"></i> Sil</div>
        </div>`;
    // Varsa eskiyi sil, yeniyi ekle
    $("#customMenu").remove();
    $("body").append(menuHtml);
}

// Resim Zoom Fonksiyonu
function zoomImage(url) {
    // Basit bir modal veya Fullscreen API ile resmi büyütür
    let zoomHtml = `<div class='zoom-overlay' onclick='$(this).remove()'><img src='${url}'></div>`;
    $("body").append(zoomHtml);
}

function playNotify() {
    var audio = new Audio('/assets/sounds/notify.mp3');
    audio.play();
}

// Resmi Büyüt
function openZoom(src) {
    const modal = document.getElementById('imageZoomModal');
    modal.querySelector('img').src = src;
    modal.classList.add('active');
}

function closeZoom() {
    document.getElementById('imageZoomModal').classList.remove('active');
}

// Sağ tık menüsünü kapatmak için ekrana tıklama
window.onclick = function () {
    $("#customMenu").remove();
}

let mediaRecorder;
let audioChunks = [];

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/ogg' });
        // Bu blob'u yukarıdaki UploadToTelegram handler'ına gönder
        uploadVoiceMessage(audioBlob);
        audioChunks = [];
    };
    mediaRecorder.start();
}

const translations = {
    "TR": {
        "search": "Ara...",
        "type_msg": "Mesaj yazın...",
        "online": "çevrimiçi",
        "danger": "ÖNEMLİ",
        "copy": "Kopyala",
        "edit": "Düzenle",
        "delete": "Sil",
        "group": "Genel Grup",
        "confirm_delete": "Bu mesajı silmek istediğinize emin misiniz?"
    },
    "RU": {
        "search": "Поиск...",
        "type_msg": "Напишите сообщение...",
        "online": "в сети",
        "danger": "ВАЖНО",
        "copy": "Копировать",
        "edit": "Изменить",
        "delete": "Удалить",
        "group": "Общая группа",
        "confirm_delete": "Вы уверены, что хотите удалить это сообщение?"
    },
    "UZ": {
        "search": "Qidiruv...",
        "type_msg": "Xabar yozing...",
        "online": "onlayn",
        "danger": "MUHIM",
        "copy": "Nusxalash",
        "edit": "Tahrirlash",
        "delete": "O'chirish",
        "group": "Umumiy guruh",
        "confirm_delete": "Haqiqatan ham bu xabarni o'chirmoqchimisiz?"
    },
    "EN": {
        "search": "Search...",
        "type_msg": "Type a message...",
        "online": "online",
        "danger": "DANGER",
        "copy": "Copy",
        "edit": "Edit",
        "delete": "Delete",
        "group": "General Group",
        "confirm_delete": "Are you sure you want to delete this message?"
    }
};

let currentLang = localStorage.getItem("lang") || "TR"; // Tarayıcıda sakla