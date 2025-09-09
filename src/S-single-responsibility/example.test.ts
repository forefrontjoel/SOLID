import { User } from "./example";

// Mock classes for testing (following SRP - each has single responsibility)
class MockUserRepository {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUser(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}

class MockEmailValidator {
  validate(email: string): boolean {
    return email.includes("@");
  }
}

class MockEmailService {
  private sentEmails: string[] = [];

  sendWelcomeEmail(user: User): void {
    this.sentEmails.push(`welcome-${user.email}`);
  }

  getSentEmails(): string[] {
    return [...this.sentEmails];
  }
}

class MockLogger {
  private logs: string[] = [];

  logUserActivity(userId: number, activity: string): void {
    this.logs.push(`User ${userId}: ${activity}`);
  }

  logSystemEvent(event: string): void {
    this.logs.push(`System: ${event}`);
  }

  getLogs(): string[] {
    return [...this.logs];
  }
}

describe("Single Responsibility Principle", () => {
  let userRepository: MockUserRepository;
  let emailValidator: MockEmailValidator;
  let emailService: MockEmailService;
  let logger: MockLogger;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    emailValidator = new MockEmailValidator();
    emailService = new MockEmailService();
    logger = new MockLogger();
  });

  describe("User", () => {
    it("should create a user with id, name, and email", () => {
      const user = new User(1, "John Doe", "john@example.com");

      expect(user.id).toBe(1);
      expect(user.name).toBe("John Doe");
      expect(user.email).toBe("john@example.com");
    });
  });

  describe("UserRepository", () => {
    it("should add and retrieve users", () => {
      const user = new User(1, "John Doe", "john@example.com");

      userRepository.addUser(user);
      const retrievedUser = userRepository.getUser(1);

      expect(retrievedUser).toEqual(user);
    });

    it("should return undefined for non-existent user", () => {
      const retrievedUser = userRepository.getUser(999);

      expect(retrievedUser).toBeUndefined();
    });
  });

  describe("EmailValidator", () => {
    it("should validate correct email format", () => {
      const isValid = emailValidator.validate("test@example.com");

      expect(isValid).toBe(true);
    });

    it("should reject invalid email format", () => {
      const isValid = emailValidator.validate("invalid-email");

      expect(isValid).toBe(false);
    });
  });

  describe("EmailService", () => {
    it("should send welcome email", () => {
      const user = new User(1, "John Doe", "john@example.com");

      emailService.sendWelcomeEmail(user);

      expect(emailService.getSentEmails()).toContain(
        "welcome-john@example.com"
      );
    });
  });

  describe("Logger", () => {
    it("should log user activity", () => {
      logger.logUserActivity(1, "User created");

      expect(logger.getLogs()).toContain("User 1: User created");
    });

    it("should log system events", () => {
      logger.logSystemEvent("System started");

      expect(logger.getLogs()).toContain("System: System started");
    });
  });
});
