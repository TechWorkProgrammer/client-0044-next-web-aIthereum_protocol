export interface CodeData {
    id: string;
    prompt: string;
    result: Record<string, Record<string, string>>;
    createdAt: string;
}