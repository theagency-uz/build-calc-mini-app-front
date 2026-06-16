type TelegramWebApp = {
	sendData: (data: string) => void;
};

declare global {
	interface Window {
		Telegram?: {
			WebApp?: TelegramWebApp;
		};
	}
}

export const sendDataToTelegramBot = (data: unknown) => {
	if (typeof window === "undefined") {
		return false;
	}

	const webApp = window.Telegram?.WebApp;

	if (!webApp?.sendData) {
		return false;
	}

	webApp.sendData(JSON.stringify(data));

	return true;
};
