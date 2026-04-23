// Словарь простых кодов (одна строка) -> страница
const simpleCodes = {
    "OLIG-1986": "level1.html",
    "KAIROS-01": "level2.html",
    "GAMMA-87": "level3.html",
    "FER-67": "level4.html",
    "AUSPEX-22": "level5.html",
    "FER-KAI": "level6.html"
};

// Комбинированные коды (например, из двух видео)
const comboMap = {
    "SGP-1967+KAIROS-01": "level3.html",    // доступ к уровню 3 через комбинацию кодов видео 1 и 2
    "GAMMA-87+FER-67": "level5.html",       // доступ к уровню 5
    "OLIG-1986+AUSPEX-22": "level4.html"
};

// Секретный код для level0 (длинная комбинация из 4 частей)
const secretCode = "87B-THETA-UMBRA-SILENTIUM";

let failedAttempts = 0;

document.getElementById("authBtn").addEventListener("click", function() {
    const code = document.getElementById("accessCode").value.trim().toUpperCase();
    const errorDiv = document.getElementById("errorMsg");

    // Сначала проверяем секретный код
    if (code === secretCode) {
        window.location.href = "level0.html";
        return;
    }

    // Проверяем комбинированные коды
    if (comboMap[code]) {
        window.location.href = comboMap[code];
        return;
    }

    // Проверяем простые коды
    if (simpleCodes[code]) {
        window.location.href = simpleCodes[code];
        return;
    }

    // Если код неверный
    failedAttempts++;
    errorDiv.innerText = `ACCESS DENIED // LOGGED (попытка ${failedAttempts})`;
    if (failedAttempts >= 3) {
        errorDiv.innerText += " // ПРЕВЫШЕН ЛИМИТ. АКТИВИРОВАН ПРОТОКОЛ ТЕНИ.";
        if (failedAttempts >= 5) {
            // После 5 неудач перенаправляем на страницу "доступ заблокирован"
            setTimeout(() => {
                window.location.href = "access_denied.html";
            }, 2000);
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