# SOLID Principles in TypeScript

A comprehensive guide to the SOLID principles of object-oriented design with practical TypeScript examples.

## What are SOLID Principles?

SOLID is an acronym for five design principles that make software designs more understandable, flexible, and maintainable:

- **S** - [Single Responsibility Principle](./src/S-single-responsibility/) ✅
- **O** - [Open/Closed Principle](./src/O-open-closed/) 🚧
- **L** - [Liskov Substitution Principle](./src/L-liskov-substitution/) 🚧
- **I** - [Interface Segregation Principle](./src/I-interface-segregation/) 🚧
- **D** - [Dependency Inversion Principle](./src/D-dependency-inversion/) 🚧

## Project Structure

```
src/
├── S-single-responsibility/    # Single Responsibility Principle
│   ├── example.ts             # Complete example with good/bad practices
│   └── README.md              # Detailed explanation
├── O-open-closed/             # Open/Closed Principle
├── L-liskov-substitution/     # Liskov Substitution Principle
├── I-interface-segregation/   # Interface Segregation Principle
├── D-dependency-inversion/    # Dependency Inversion Principle
└── index.ts                   # Main entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running Examples

```bash
# Run in development mode
npm run dev

# Or build and run
npm run build
npm start
```

### Running Tests

```bash
npm test
```

## Current Status

✅ **Single Responsibility Principle** - Complete with detailed examples  
🚧 **Other Principles** - Coming soon

## Contributing

Feel free to contribute by adding examples for the remaining SOLID principles or improving existing ones.

## License

MIT
