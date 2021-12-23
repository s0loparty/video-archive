const ERROR_CODES = {
	EMAIL_NOT_FOUND: 'Такой Email не найден &#128533',
	MISSING_EMAIL: 'Заполните поле Email &#128556',
	INVALID_EMAIL: 'Неверный Email &#128542',

	INVALID_PASSWORD: 'Неверный пароль &#128531',
	MISSING_PASSWORD: 'Заполните поле пароля &#128556',
	TOO_MANY_ATTEMPTS_TRY_LATER: 'Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или можете повторить попытку позже.',
}

export function error(code) {
	code = code.split(':')[0].trim()
	return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка &#128546'
}
