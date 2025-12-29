# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Single Source of Truth

**All documentation, architecture details, commands, and configuration information are maintained in [README.md](README.md).**

Please refer to README.md for:

- **Quick Start & Setup** - Installation, environment setup, database configuration
- **Development Commands** - All pnpm scripts, testing, linting, migrations
- **Project Architecture** - High-level overview, routing, directory structure
- **Theme Configuration** - Complete JSON schema for colors, typography, spacing, breakpoints
- **Collections & Content Model** - Pages, Posts, Media, Categories, Users
- **Layout Builder System** - Available blocks, adding new blocks
- **Access Control** - Authentication patterns and implementation
- **Hooks & Revalidation** - ISR cache invalidation, data population
- **Testing** - Vitest integration tests, Playwright e2e tests
- **Database & Migrations** - PostgreSQL setup, migration workflow
- **Production Deployment** - Build process, Vercel deployment, self-hosting

## Why README.md is the Single Source of Truth

Maintaining documentation in a single location ensures:
- No conflicting or outdated information
- Easier maintenance and updates
- Better discoverability for all developers (humans and AI)
- Consistency across documentation consumers

## Quick Reference

For the most common tasks, see these README.md sections:

- **Getting Started**: [README.md#quick-start](README.md#quick-start)
- **Commands**: [README.md#development-commands](README.md#development-commands)
- **Architecture**: [README.md#project-architecture](README.md#project-architecture)
- **Theme Customization**: [README.md#theme-configuration](README.md#theme-configuration)
- **Adding Features**: [README.md#layout-builder-system](README.md#layout-builder-system)
