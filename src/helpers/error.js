const ERROR_CODES = {
	EMAIL_NOT_FOUND: 'Такой Email не найден &#128533',
	MISSING_EMAIL: 'Заполните поле Email &#128556',
	INVALID_EMAIL: 'Неверный Email &#128542',

	INVALID_PASSWORD: 'Неверный пароль &#128531',
	MISSING_PASSWORD: 'Заполните поле пароля &#128556'
}

export function error(code) {
	return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка &#128546'
}
