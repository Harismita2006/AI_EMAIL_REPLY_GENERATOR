
import { EmailItem } from "@/types/email";

// This is a mock service for local development
// In production, this would connect to a real email API
export const EmailService = {
  // Simulate sending an email (returns a promise that resolves after 1 second)
  sendEmail: async (to: string, subject: string, body: string): Promise<boolean> => {
    console.log("Sending email:", { to, subject, body });
    
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 95% success rate
        const success = Math.random() < 0.95;
        resolve(success);
      }, 1000);
    });
  },
  
  // Get mock emails (for local development)
  getEmails: async (): Promise<EmailItem[]> => {
    // This would fetch from an API in production
    return Promise.resolve([]);
  }
};
