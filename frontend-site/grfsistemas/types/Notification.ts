export type Notification = {
    type: 'info' | 'warning' | 'error' | 'success',
    content: string,
    cancelable?: boolean
    timeout: number, 
}