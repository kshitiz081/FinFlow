# Contributing to FinFlow

Thank you for your interest in contributing to FinFlow! This document provides guidelines for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/finflow.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Follow the setup guide in [SETUP.md](./SETUP.md)

## Development Process

### Before You Start

- Check existing issues and PRs to avoid duplicates
- Discuss major changes in an issue first
- Ensure tests pass: `npm test` in backend and frontend

### Making Changes

1. **Create a descriptive branch name**
   ```
   feature/add-websocket-support
   fix/cache-invalidation-bug
   docs/api-documentation
   ```

2. **Write clean code**
   - Follow TypeScript strict mode
   - Use meaningful variable names
   - Add comments for complex logic

3. **Add tests**
   - Aim for 80%+ test coverage
   - Test happy path and error cases
   - Use mocks for external dependencies

4. **Format and lint**
   ```bash
   npm run lint
   npm run format  # if available
   ```

## Commit Messages

Use clear, descriptive commit messages:
```
feat: add WebSocket support for real-time updates
fix: resolve memory leak in cache service
docs: update API documentation
refactor: improve error handling middleware
test: add integration tests for market data endpoint
```

## Pull Request Process

1. **Update branch with latest main**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push your changes**
   ```bash
   git push origin feature/your-feature
   ```

3. **Create PR with detailed description**
   - What problem does it solve?
   - How is it tested?
   - Any breaking changes?

4. **Respond to feedback**
   - Address review comments
   - Re-request review after changes

## Code Quality Standards

### Backend
- ✅ TypeScript strict mode enabled
- ✅ No `any` types (except necessary cases)
- ✅ Error handling for all async operations
- ✅ Logging for debugging
- ✅ Unit tests for services
- ✅ Integration tests for APIs

### Frontend
- ✅ React hooks best practices
- ✅ Memoization where needed
- ✅ Proper error boundaries
- ✅ Accessibility (a11y) compliance
- ✅ Responsive design
- ✅ Component tests

## Testing Requirements

All PRs must include:
- ✅ Unit tests for new functions/components
- ✅ Integration tests for new features
- ✅ Test coverage >80%
- ✅ All existing tests pass

## Documentation

- Update README.md if adding new features
- Add JSDoc comments for public functions
- Document environment variables in .env.example
- Update API docs if changing endpoints

## Performance Considerations

Before submitting:
- ✅ Profile React components for unnecessary renders
- ✅ Check bundle size impact
- ✅ Verify API response times
- ✅ Test with realistic data volumes

## Release Process

Maintainers will:
1. Review and test your PR
2. Merge to main branch
3. Tag release version
4. Update changelog

## Questions?

- Open an issue for questions
- Check existing issues for answers
- Review PR history for patterns

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- GitHub contributors page

Thank you for contributing to FinFlow! 🚀
