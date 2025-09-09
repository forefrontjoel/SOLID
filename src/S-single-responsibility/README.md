# Single Responsibility Principle (SRP)

## Definition

A class should have only one reason to change, meaning it should have only one job or responsibility.

## Key Points

- Each class should focus on a single concern
- Changes to one responsibility shouldn't affect other responsibilities
- Makes code more maintainable, testable, and understandable
- Reduces coupling between different parts of the system

## Example Overview

This example demonstrates the difference between:

- **Bad Example**: A `BadUserManager` class that handles multiple responsibilities (user management, email validation, email sending, and logging)
- **Good Example**: Separate classes for each responsibility (`UserRepository`, `EmailValidator`, `EmailService`, `Logger`, and `UserService`)

## Benefits of Following SRP

1. **Easier Testing**: Each class can be tested in isolation
2. **Better Maintainability**: Changes to one responsibility don't affect others
3. **Improved Readability**: Each class has a clear, single purpose
4. **Reduced Coupling**: Classes depend on specific interfaces rather than monolithic classes
5. **Enhanced Reusability**: Single-purpose classes can be reused in different contexts

## How to Run

```bash
npm run dev
```

Or to build and run:

```bash
npm run build
npm start
```
