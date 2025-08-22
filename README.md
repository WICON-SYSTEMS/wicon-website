<div align="center">

<img width="521" height="479" alt="wicon" src="https://github.com/user-attachments/assets/a93c8b66-6e0b-4a23-83d6-41e6c3762bc0" />


# WiCon Systems Website

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

_A modern, responsive marketing website showcasing WiCon Systems' technology solutions and digital education programs_

[🌐 Live Demo](https://wicon-lyart.vercel.app/) • [📖 Documentation](#documentation) • [🤝 Contributing](#contributing) • [🐛 Report Bug](https://github.com/WICON-SYSTEMS/wicon-website/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code of Conduct](#code-of-conduct)
- [Support](#support)
- [License](#license)

## 🎯 Overview

The WiCon Systems website is a content-first, responsive marketing platform built with modern web technologies. It serves as the digital presence for WiCon Systems, showcasing our comprehensive technology solutions and educational programs.

### What We Showcase

- **🔌 Wireless Electrical Controllers** - Advanced automation solutions
- **💻 Custom Software Solutions** - Tailored technology implementations
- **🌐 IoT Solutions** - Internet of Things integrations
- **☀️ Solar PV & Electrical Services** - Renewable energy installations
- **📹 CCTV Security Systems** - Comprehensive surveillance solutions
- **🎓 WiCon for Digital Education** - Annual training programs

## ✨ Key Features

- **🎨 Modern Design System** - Consistent UI with shadcn/ui components
- **📱 Fully Responsive** - Optimized for all device sizes
- **♿ Accessibility First** - WCAG compliant interface
- **⚡ Performance Optimized** - Fast loading with Next.js 15
- **🔍 SEO Ready** - Structured metadata and social sharing
- **🌙 Theme Support** - Light/dark mode capability (ready to implement)
- **📝 Type Safe** - Full TypeScript implementation
- **🎯 Component Library** - Reusable UI primitives

## 🛠 Technology Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component system

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Development Tools

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[PostCSS](https://postcss.org/)** - CSS transformation tool
- **[ESLint](https://eslint.org/)** - Code linting and formatting

## 📁 Project Structure

```
wicon-systems/
├── 📁 app/                     # Next.js App Router pages
│   ├── 📄 layout.tsx          # Root layout with metadata
│   ├── 🎨 globals.css         # Global styles (Tailwind v4)
│   ├── 🏠 page.tsx            # Homepage
│   ├── 📁 about/              # About page
│   ├── 📁 blog/               # Blog section
│   ├── 📁 careers/            # Career opportunities
│   ├── 📁 contact/            # Contact information
│   ├── 📁 products/           # Product showcase
│   ├── 📁 services/           # Service offerings
│   └── 📁 training/           # Education programs
│       ├── 📄 page.tsx        # Main training page
│       └── 📁 2024/           # Year-specific content
├── 📁 components/             # React components
│   ├── 📄 header.tsx          # Navigation header
│   ├── 📄 footer.tsx          # Site footer
│   ├── 📄 theme-provider.tsx  # Theme context
│   └── 📁 ui/                 # Reusable UI components
│       ├── 📄 button.tsx      # Button variants
│       ├── 📄 card.tsx        # Card layouts
│       ├── 📄 form.tsx        # Form components
│       └── 📄 ...             # Additional UI primitives
├── 📁 hooks/                  # Custom React hooks
├── 📁 lib/                    # Utility functions
├── 📁 public/                 # Static assets
│   ├── 🖼️ *.png              # Images and graphics
│   └── 📁 downloads/          # Downloadable resources
├── 📁 styles/                 # Additional stylesheets
├── ⚙️ next.config.mjs         # Next.js configuration
├── 📦 package.json            # Dependencies and scripts
├── 🔒 pnpm-lock.yaml          # Lock file
├── 🎨 postcss.config.mjs      # PostCSS configuration
├── 📝 tsconfig.json           # TypeScript configuration
└── 📖 README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** `18.18+` (Node.js 20+ recommended)
- **pnpm** `9+` (preferred package manager)

> **💡 Tip:** Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/WICON-SYSTEMS/wicon-website.git
   cd wicon-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm run dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Commands

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix linting issues
```

## 🔧 Development

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Follow our [coding standards](#coding-standards)
   - Write meaningful commit messages
   - Test your changes locally

3. **Run quality checks**

   ```bash
   pnpm run lint        # Check for linting errors
   pnpm run build       # Ensure build succeeds
   ```

4. **Submit a pull request**
   - Follow our [PR guidelines](#pull-request-guidelines)

### Coding Standards

#### TypeScript Guidelines

- **Always use TypeScript** - No `.js` files in the codebase
- **Define proper interfaces** - Create types for all props and data structures
- **Use strict mode** - Leverage TypeScript's strict checking
- **Avoid `any` type** - Use specific types or `unknown` when necessary

#### Component Guidelines

- **Functional components only** - Use React function components
- **Props interface** - Define clear prop interfaces
- **Client components** - Add `"use client"` directive when using hooks or browser APIs
- **Composition over inheritance** - Prefer component composition

#### Styling Guidelines

- **Tailwind first** - Use Tailwind CSS classes for styling
- **UI components** - Leverage `components/ui/*` for consistency
- **Responsive design** - Mobile-first approach with responsive utilities
- **Semantic HTML** - Use proper HTML elements for accessibility

#### File Organization

- **Colocation** - Keep related files close to where they're used
- **Naming conventions** - Use kebab-case for files, PascalCase for components
- **Barrel exports** - Use index files for clean imports

### Environment Variables

Currently, no environment variables are required. When adding external services:

1. **Create `.env.local.example`** with example values
2. **Document variables** in this README
3. **Never commit** actual `.env.local` files

### Testing

> **📝 Note:** Testing setup is planned for future implementation

Planned testing stack:

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure settings:**
   - Framework Preset: `Next.js`
   - Build Command: `pnpm run build`
   - Output Directory: `.next`
3. **Deploy** - Automatic deployments on push to main

### Alternative Platforms

- **Netlify** - Supports Next.js with adapters
- **Cloudflare Pages** - Edge deployment option
- **AWS Amplify** - Full-stack deployment

### Manual Deployment

```bash
# Build the application
pnpm run build

# Start production server
pnpm run start
```

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### Ways to Contribute

- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new functionality
- 📝 **Documentation** - Improve or expand documentation
- 🎨 **Design** - Enhance UI/UX elements
- 🔧 **Code** - Submit bug fixes or new features

### Before You Start

1. **Check existing issues** - Avoid duplicate work
2. **Discuss major changes** - Open an issue for significant modifications
3. **Follow our guidelines** - Adhere to coding standards and PR process

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** from `main`
4. **Make your changes** following our standards
5. **Test thoroughly** - Ensure everything works
6. **Submit a pull request** following our guidelines

### Contribution Areas

#### High Priority

- 🔗 **Form Integration** - Wire up training forms with validation
- 🖼️ **Asset Optimization** - Replace placeholder images
- 🔍 **SEO Enhancement** - Add metadata and Open Graph images
- 🌙 **Dark Mode** - Implement theme switching

#### Medium Priority

- 📱 **Mobile Optimization** - Enhance mobile experience
- ⚡ **Performance** - Optimize loading and rendering
- ♿ **Accessibility** - Improve WCAG compliance
- 🧪 **Testing** - Add unit and integration tests

#### Nice to Have

- 📊 **Analytics** - Integrate tracking solutions
- 🔒 **Security** - Enhance security headers
- 🌐 **Internationalization** - Multi-language support
- 📈 **Monitoring** - Error tracking and performance monitoring

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] **Branch naming** - Use descriptive names (`feature/add-contact-form`, `fix/header-navigation`)
- [ ] **Code quality** - Run `pnpm run lint` and fix all issues
- [ ] **Build success** - Ensure `pnpm run build` completes without errors
- [ ] **Testing** - Test your changes thoroughly in development
- [ ] **Documentation** - Update relevant documentation

### PR Requirements

#### Title Format

Use conventional commit format:

```
type(scope): description

Examples:
feat(training): add form validation
fix(header): resolve mobile navigation issue
docs(readme): update contribution guidelines
```

#### Description Template

```markdown
## 📝 Description

Brief description of changes made.

## 🔄 Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## 🧪 Testing

- [ ] I have tested these changes locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## 📸 Screenshots (if applicable)

Add screenshots to help explain your changes.

## ✅ Checklist

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Review Process

1. **Automated checks** - All CI checks must pass
2. **Code review** - At least one maintainer review required
3. **Testing** - Changes tested in staging environment
4. **Approval** - Maintainer approval before merge

### Merge Strategy

- **Squash and merge** - For feature branches
- **Rebase and merge** - For hotfixes
- **No direct pushes** to `main` branch

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background, experience level, or identity.

### Expected Behavior

- **Be respectful** - Treat all community members with respect
- **Be collaborative** - Work together constructively
- **Be inclusive** - Welcome newcomers and diverse perspectives
- **Be professional** - Maintain professional communication

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Spam or irrelevant content
- Violation of privacy or confidentiality

### Reporting

Report any violations to [conduct@wicon-systems.com](mailto:conduct@wicon-systems.com). All reports will be handled confidentially.

## 🆘 Support

### Getting Help

- 📖 **Documentation** - Check this README and inline code comments
- 🐛 **Issues** - Search existing issues or create a new one
- 💬 **Discussions** - Use GitHub Discussions for questions
- 📧 **Email** - Contact [dev@wicon-systems.com](mailto:dev@wicon-systems.com)

### Reporting Issues

When reporting bugs, please include:

1. **Environment details** (OS, Node.js version, browser)
2. **Steps to reproduce** the issue
3. **Expected behavior** vs actual behavior
4. **Screenshots** or error messages
5. **Additional context** that might be helpful

### Feature Requests

For feature requests, please provide:

1. **Clear description** of the proposed feature
2. **Use case** - Why is this feature needed?
3. **Proposed solution** - How should it work?
4. **Alternatives considered** - Other approaches you've thought about

## 📄 License

This project is proprietary software owned by WiCon Systems. All rights reserved.

**© 2024 WiCon Systems. All rights reserved.**

For licensing inquiries, contact [legal@wicon-systems.com](mailto:legal@wicon-systems.com).

---

<div align="center">

**Made with ❤️ by the WiCon Systems Team**

[Website](https://wicon-lyart.vercel.app/) • [GitHub](https://github.com/WICON-SYSTEMS) • [Contact](mailto:info@wicon-systems.com)

</div>
