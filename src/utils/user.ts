export interface UserData {
    id: string;
    username: string;
    address: string;
    point: number;
    accessToken: string;
    refreshToken: string;
    walletType: string;
}

const USER_KEY = "CypherAI_AUTH";

const isBrowser = (): boolean => typeof window !== "undefined";

export const saveUser = (data: UserData): void => {
    if (!isBrowser()) return;
    try {
        localStorage.setItem(USER_KEY, JSON.stringify(data));
    } catch (err) {
        console.error("Error saving user data:", err);
    }
};

export const getUser = (): UserData | null => {
    if (!isBrowser()) return null;
    try {
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as UserData;
    } catch (err) {
        console.error("Error reading user data:", err);
        return null;
    }
};

export const clearUser = (): void => {
    if (!isBrowser()) return;
    try {
        localStorage.removeItem(USER_KEY);
    } catch (err) {
        console.error("Error clearing user data:", err);
    }
};

export const getAccessToken = (): string | null => {
    return getUser()?.accessToken || null;
};

export const getRefreshToken = (): string | null => {
    return getUser()?.refreshToken || null;
};

export const updateTokens = (
    accessToken: string,
    refreshToken: string
): void => {
    const u = getUser();
    if (!u) return;
    saveUser({...u, accessToken, refreshToken});
};

export const forceLogout = () => {
    clearUser();
    if (typeof window !== "undefined") {
        window.location.reload();
    }
};
