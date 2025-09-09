/**
 * Single Responsibility Principle (SRP)
 *
 * Definition: A class should have only one reason to change, meaning it should have only one job or responsibility.
 *
 * This example demonstrates:
 * - BAD: A class that violates SRP by handling multiple responsibilities
 * - GOOD: Classes that follow SRP by having single, well-defined responsibilities
 */

// ❌ BAD EXAMPLE - Violates Single Responsibility Principle
class BadUserManager {
  private users: Array<{ id: number; name: string; email: string }> = [];

  // Responsibility 1: User data management
  addUser(name: string, email: string): void {
    const id = this.users.length + 1;
    this.users.push({ id, name, email });
  }

  getUser(id: number): { id: number; name: string; email: string } | undefined {
    return this.users.find((user) => user.id === id);
  }

  // Responsibility 2: Email validation (should be separate)
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Responsibility 3: Email sending (should be separate)
  sendWelcomeEmail(userId: number): void {
    const user = this.getUser(userId);
    if (user && this.validateEmail(user.email)) {
      console.log(`📧 Sending welcome email to ${user.email}`);
      // Email sending logic would go here
    }
  }

  // Responsibility 4: Logging (should be separate)
  logUserActivity(userId: number, activity: string): void {
    console.log(
      `🪵 User ${userId}: ${activity} at ${new Date().toISOString()}`
    );
  }
}

// ✅ GOOD EXAMPLE - Follows Single Responsibility Principle

// Responsibility 1: User data management only
export class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string
  ) {}
}

export class UserRepository {
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

// Responsibility 2: Email validation only
class EmailValidator {
  validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Responsibility 3: Email sending only
class EmailService {
  sendWelcomeEmail(user: User): void {
    console.log(`📧 Sending welcome email to ${user.email}`);
    // Email sending logic would go here
  }

  sendNotificationEmail(user: User, message: string): void {
    console.log(`📧 Sending notification to ${user.email}: ${message}`);
    // Email sending logic would go here
  }
}

// Responsibility 4: Logging only
class Logger {
  logUserActivity(userId: number, activity: string): void {
    console.log(
      `🪵 User ${userId}: ${activity} at ${new Date().toISOString()}`
    );
  }

  logSystemEvent(event: string): void {
    console.log(`🪵 System: ${event} at ${new Date().toISOString()}`);
  }
}

// Responsibility 5: Orchestrating user operations (single responsibility: coordination)
class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailValidator: EmailValidator,
    private emailService: EmailService,
    private logger: Logger
  ) {}

  createUser(name: string, email: string): User | null {
    // Validate email using dedicated validator
    if (!this.emailValidator.validate(email)) {
      this.logger.logSystemEvent(`Invalid email attempted: ${email}`);
      return null;
    }

    // Create and store user
    const id = Date.now(); // Simple ID generation
    const user = new User(id, name, email);
    this.userRepository.addUser(user);

    // Send welcome email
    this.emailService.sendWelcomeEmail(user);

    // Log activity
    this.logger.logUserActivity(user.id, "User created");

    return user;
  }

  getUser(id: number): User | undefined {
    const user = this.userRepository.getUser(id);
    if (user) {
      this.logger.logUserActivity(id, "User retrieved");
    }
    return user;
  }
}

// Example usage and demonstration
export function runSingleResponsibilityExample(): void {
  console.log("\n🔴 Bad Example (Violates SRP):");
  console.log("--------------------------------");

  const badUserManager = new BadUserManager();
  badUserManager.addUser("John Doe", "john@example.com");
  badUserManager.sendWelcomeEmail(1);
  badUserManager.logUserActivity(1, "User logged in");

  console.log("\n✅ The BadUserManager class has too many responsibilities:");
  console.log("   - User data management");
  console.log("   - Email validation");
  console.log("   - Email sending");
  console.log("   - Logging");
  console.log(
    "   This violates SRP because changes to any of these responsibilities could require modifying this class."
  );

  console.log("\n🟢 Good Example (Follows SRP):");
  console.log("------------------------------");

  // Create dependencies (each with single responsibility)
  const userRepository = new UserRepository();
  const emailValidator = new EmailValidator();
  const emailService = new EmailService();
  const logger = new Logger();

  // Create service that orchestrates operations
  const userService = new UserService(
    userRepository,
    emailValidator,
    emailService,
    logger
  );

  // Use the service
  const user = userService.createUser("Jane Smith", "jane@example.com");
  if (user) {
    userService.getUser(user.id);
  }

  console.log("\n✅ Benefits of following SRP:");
  console.log("   - Each class has a single, well-defined responsibility");
  console.log("   - Changes to email validation won't affect user storage");
  console.log("   - Changes to logging won't affect email sending");
  console.log("   - Each class is easier to test in isolation");
  console.log("   - Code is more maintainable and extensible");
}
