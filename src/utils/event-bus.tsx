// Simple event bus for cross-component communication
class EventBus {
  private events: { [key: string]: Function[] } = {};

  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}

export const eventBus = new EventBus();

// Event constants
export const EVENTS = {
  COURSES_UPDATED: 'courses:updated',
  COURSE_CREATED: 'course:created',
  COURSE_UPDATED: 'course:updated',
  COURSE_DELETED: 'course:deleted',
  BLOG_UPDATED: 'blog:updated',
  BLOG_CREATED: 'blog:created',
  BLOG_DELETED: 'blog:deleted'
};