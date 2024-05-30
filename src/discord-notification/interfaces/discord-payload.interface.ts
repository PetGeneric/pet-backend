export interface DiscordPayload {
    title: string;
    description: string;
    message: string;
    type: 'log' | 'error';
}