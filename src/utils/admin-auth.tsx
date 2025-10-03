// Admin authentication utilities
export class AdminAuth {
  // Check if user is authenticated as admin
  static isAuthenticated(): boolean {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  }

  // Get admin user info
  static getAdminUser(): { email: string; role: string; name: string } | null {
    const userStr = sessionStorage.getItem('admin_user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Logout admin
  static logout(): void {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_user');
    window.location.hash = '#/admin/login';
  }

  // Check authentication and redirect if needed
  static requireAuth(): boolean {
    if (!this.isAuthenticated()) {
      window.location.hash = '#/admin/login';
      return false;
    }
    return true;
  }

  // Admin credentials for demo (in production, this would be in backend)
  static validateCredentials(email: string, password: string): boolean {
    const ADMIN_CREDENTIALS = {
      email: "admin@tnqdo.com",
      password: "admin123"
    };

    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
  }

  // Login admin
  static login(email: string, password: string): boolean {
    if (this.validateCredentials(email, password)) {
      sessionStorage.setItem('admin_authenticated', 'true');
      sessionStorage.setItem('admin_user', JSON.stringify({
        email: email,
        role: 'admin',
        name: 'Administrator'
      }));
      return true;
    }
    return false;
  }

  // Get admin permissions
  static getPermissions(): string[] {
    if (!this.isAuthenticated()) return [];

    // In a real app, permissions would come from the backend
    return [
      'courses.create',
      'courses.read',
      'courses.update',
      'courses.delete',
      'users.read',
      'users.update',
      'users.delete',
      'analytics.read',
      'settings.read',
      'settings.update'
    ];
  }

  // Check if admin has specific permission
  static hasPermission(permission: string): boolean {
    const permissions = this.getPermissions();
    return permissions.includes(permission);
  }

  // Format admin display name
  static getDisplayName(): string {
    const user = this.getAdminUser();
    return user?.name || 'Administrator';
  }

  // Get session info for debugging
  static getSessionInfo(): {
    isAuthenticated: boolean;
    user: any;
    permissions: string[];
    sessionStart?: string;
  } {
    return {
      isAuthenticated: this.isAuthenticated(),
      user: this.getAdminUser(),
      permissions: this.getPermissions(),
      sessionStart: sessionStorage.getItem('admin_session_start') || undefined
    };
  }

  // Initialize session tracking
  static initSession(): void {
    if (this.isAuthenticated() && !sessionStorage.getItem('admin_session_start')) {
      sessionStorage.setItem('admin_session_start', new Date().toISOString());
    }
  }

  // Check session timeout (optional security feature)
  static checkSessionTimeout(timeoutMinutes: number = 60): boolean {
    const sessionStart = sessionStorage.getItem('admin_session_start');
    if (!sessionStart) return false;

    const startTime = new Date(sessionStart);
    const now = new Date();
    const diffMinutes = (now.getTime() - startTime.getTime()) / (1000 * 60);

    if (diffMinutes > timeoutMinutes) {
      this.logout();
      return true; // Session timed out
    }

    return false; // Session still valid
  }
}