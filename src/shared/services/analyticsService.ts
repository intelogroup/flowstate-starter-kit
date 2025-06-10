
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  track(eventName: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: new Date(),
    };

    this.events.push(event);
    console.log('Analytics Event:', event);

    // In production, this would send to analytics service
    // Example: this.sendToAnalytics(event);
  }

  page(pageName: string, properties?: Record<string, any>): void {
    this.track('page_view', {
      page: pageName,
      ...properties,
    });
  }

  flowCreated(flowId: string, flowName: string): void {
    this.track('flow_created', {
      flow_id: flowId,
      flow_name: flowName,
    });
  }

  flowExecuted(flowId: string, success: boolean): void {
    this.track('flow_executed', {
      flow_id: flowId,
      success,
    });
  }

  templateUsed(templateId: string, templateName: string): void {
    this.track('template_used', {
      template_id: templateId,
      template_name: templateName,
    });
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const analyticsService = new AnalyticsService();
