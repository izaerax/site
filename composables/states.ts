export const useCommandState = () => useState<string>('command', () => '')
export const useHistoryState = () => useState<Array<string>>('history', () => [])
