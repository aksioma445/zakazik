// Ініціалізація Telegram WebApp
window.Telegram.WebApp.init();

// Функція для завантаження інформації користувача з JSON файлу
async function loadUserData() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user?.id;

    if (!userId) {
        console.error("Не вдалося отримати ID користувача");
        return;
    }

    try {
        const response = await fetch('/path/to/user_data.json'); // Вкажіть правильний шлях до JSON-файлу
        const userData = await response.json();

        // Перевірка наявності даних користувача
        if (userData[userId]) {
            const userInfo = userData[userId];

            // Відображення даних у відповідних елементах
            document.getElementById("username").textContent = `Ім'я: ${userInfo.username || "Unknown User"}`;
            document.getElementById("user-id").textContent = `ID: ${userInfo.id || "N/A"}`;

            // Заповнення даних у бульбашках
            document.getElementById("balance-bubble").textContent = `Баланс: ${userInfo.balance || 0}$`;
            document.getElementById("bonus-bubble").textContent = `Бонус: ${userInfo.bonus_hours || 0} годин`;
            document.getElementById("level-bubble").textContent = `Рівень: ${userInfo.level || 1}`;

            // Додатково, якщо є зображення профілю (при необхідності)
            if (userInfo.profile_picture) {
                const profileBubble = document.getElementById("profile-bubble");
                profileBubble.textContent = ""; // Очищення тексту
                const img = document.createElement("img");
                img.src = userInfo.profile_picture;
                img.alt = "Фото профілю";
                img.classList.add("profile-image"); // Стиль для зображення профілю
                profileBubble.appendChild(img);
            }
        } else {
            console.warn("Дані користувача не знайдені");
        }
    } catch (error) {
        console.error("Помилка завантаження даних користувача:", error);
    }
}

// Завантаження інформації користувача при завантаженні сторінки
window.onload = function() {
    loadUserData();
}
