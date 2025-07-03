export interface Notification {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
    actionLink?: string;
}
