// ------------------------------
// STABILIS ARCHIVE SCRIPT v.3.1.7
// Последние изменения: 2026/04/24
// ------------------------------

// Консольные пасхалки
console.log("%c[STB-ARCHIVE] %cСистема загрузки завершена. Уровень допуска: 0", "color: #0F0", "color: #6F6");
console.log("%c[WARNING] %cОбнаружен неавторизованный доступ к консоли. Ваш ID будет зафиксирован.", "color: #F44", "color: #CCC");
console.log("%c[DEBUG] %cЕсли вы это видите, значит, вы знаете, что искать. Ищите дальше.", "color: #F0F", "color: #AAA");
console.log("%c-----//-----//-----", "color: #0F0");
console.log("b64: aHR0cHM6Ly9zdGFiaWxpc2FyY2hpdmUuY29tL2Zha2U=");
console.log("%c-----//-----//-----", "color: #0F0");

// Скрытая команда для консоли (зашифрована base64)
const HIDDEN_CONSOLE_CODE = atob("U0lMRU5USVVNLU9WRVJUVVJF"); // SILENTIUM-OVERTURE

// Имитация счётчика сессии
let fakeSessionID = Math.floor(Math.random() * 0xFFFF).toString(16);
console.log(`%c[STB] %cСессия: ${fakeSessionID}`, "color: #0F0", "color: #6F6");

// ----- ОБЫЧНЫЕ КОДЫ ДЛЯ УРОВНЕЙ -----
const simpleCodes = {
    "OLIG-1986": "level1.html",
    "KAIROS-01": "level2.html",
    "GAMMA-87": "level3.html",
    "FER-67": "level4.html",
    "AUSPEX-22": "level5.html",
    "FER-KAI": "level6.html"
};

const comboMap = {
    "OLIG-1986+KAIROS-01": "level3.html",
    "GAMMA-87+FER-67": "level5.html",
    "OLIG-1986+AUSPEX-22": "level4.html"
};

const secretCodeStandard = "87B-THETA-UMBRA-SILENTIUM";

let failedAttempts = 0;

function handleNormalAuth(code) {
    if (code === secretCodeStandard) {
        window.location.href = "level0.html";
        return true;
    }
    if (comboMap[code]) {
        window.location.href = comboMap[code];
        return true;
    }
    if (simpleCodes[code]) {
        window.location.href = simpleCodes[code];
        return true;
    }
    return false;
}

document.getElementById("authBtn").addEventListener("click", function() {
    const code = document.getElementById("accessCode").value.trim().toUpperCase();
    const errorDiv = document.getElementById("errorMsg");
    errorDiv.innerText = "";

    // Пасхалка: если ввести команду из консоли, то вывести сообщение в консоль
    if (code === HIDDEN_CONSOLE_CODE) {
        console.log("%c[STB] %cКоманда распознана. Но здесь ничего нет. Попробуйте в другом месте.", "color: #0F0", "color: #FFF");
        document.getElementById("accessCode").value = "";
        return;
    }

    if (handleNormalAuth(code)) {
        document.getElementById("accessCode").value = "";
        return;
    }

    // Неверный код
    failedAttempts++;
    errorDiv.innerText = `ACCESS DENIED // LOGGED (ПОПЫТКА ${failedAttempts})`;
    if (failedAttempts >= 3) {
        errorDiv.innerText += " // ПРОТОКОЛ ТЕНИ АКТИВИРОВАН";
        if (failedAttempts >= 5) {
            setTimeout(() => { window.location.href = "access_denied.html"; }, 2000);
        } else {
            setTimeout(() => { errorDiv.innerText = ""; }, 4000);
        }
    } else {
        setTimeout(() => { errorDiv.innerText = ""; }, 3000);
    }
    document.getElementById("accessCode").value = "";
});

document.getElementById("accessCode").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        document.getElementById("authBtn").click();
    }
});

// Имитация активности в консоли (каждые 30 секунд, если консоль открыта)
setInterval(() => {
    console.log("%c[STB] %cСессия активна. Время: " + new Date().toLocaleTimeString(), "color: #0F0", "color: #6F6");
}, 30000);