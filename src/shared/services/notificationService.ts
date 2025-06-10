
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  show(notification: Omit<Notification, 'id'>): string {
    const id = Date.now().toString();
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000,
    };

    this.notifications.push(newNotification);
    this.notifyListeners();

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newNotification.duration);
    }

    return id;
  }

  success(title: string, message: string): string {
    return this.show({ type: 'success', title, message });
  }

  error(title: string, message: string): string {
    return this.show({ type: 'error', title, message });
  }

  warning(title: string, message: string): string {
    return this.show({ type: 'warning', title, message });
  }

  info(title: string, message: string): string {
    return this.show({ type: 'info', title, message });
  }

  remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  clear(): void {
    this.notifications = [];
    this.notifyListeners();
  }

  subscribe(callback: (notifications: Notification[]) => void): () => void {
    this.listeners.push(callback);
    
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }
}

export const notificationService = new NotificationService();
