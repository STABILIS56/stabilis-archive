// ----- ОБЫЧНЫЕ КОДЫ ДЛЯ УРОВНЕЙ -----
const simpleCodes = {
    "OLIG-1986": "level1.html",
    "KAIROS-01": "level2.html",
    "GAMMA-87": "level3.html",
    "FER-67": "level4.html",
    "AUSPEX-22": "level5.html",
    "FER-KAI": "level6.html",
    "GLOBAL-01": "global_forecast.html"
};

// ----- КОМБИНИРОВАННЫЕ КОДЫ -----
const comboMap = {
    "OLIG-1986+KAIROS-01": "level3.html",
    "GAMMA-87+FER-67": "level5.html",
    "OLIG-1986+AUSPEX-22": "level4.html"
};

// ----- СЕКРЕТНЫЙ КОД ДЛЯ УРОВНЯ 0 (ГЕПТАРХ) -----
const secretCodeStandard = "87B-THETA-UMBRA-SILENTIUM";

let failedAttempts = 0;

document.getElementById("authBtn").addEventListener("click", function() {
    const code = document.getElementById("accessCode").value.trim().toUpperCase();
    const errorDiv = document.getElementById("errorMsg");
    errorDiv.innerText = "";

    // Проверка секретного кода
    if (code === secretCodeStandard) {
        window.location.href = "level0.html";
        return;
    }
    // Проверка комбинированных кодов
    if (comboMap[code]) {
        window.location.href = comboMap[code];
        return;
    }
    // Проверка простых кодов
    if (simpleCodes[code]) {
        window.location.href = simpleCodes[code];
        return;
    }

    // Если код неверный
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