# Branching Strategy

This project uses a **Git Flow** inspired branching strategy for organized development and releases.

## Branch Types

### Main Branches

#### `main`
- **Purpose**: Production-ready code
- **Protected**: Yes (requires PR + reviews)
- **Deployment**: Automatically deploys to production
- **Naming**: `main`
- **Lifetime**: Permanent

#### `develop`
- **Purpose**: Integration branch for features
- **Protected**: Yes (requires PR)
- **Deployment**: Automatically deploys to staging
- **Naming**: `develop`
- **Lifetime**: Permanent

### Supporting Branches

#### Feature Branches
- **Purpose**: Develop new features
- **Branch from**: `develop`
- **Merge into**: `develop`
- **Naming**: `feature/<ticket-id>-<short-description>`
- **Example**: `feature/SF-123-add-login-feature`
- **Lifetime**: Temporary (deleted after merge)

#### Bugfix Branches
- **Purpose**: Fix bugs in development
- **Branch from**: `develop`
- **Merge into**: `develop`
- **Naming**: `bugfix/<ticket-id>-<short-description>`
- **Example**: `bugfix/SF-456-fix-validation-error`
- **Lifetime**: Temporary

#### Hotfix Branches
- **Purpose**: Emergency fixes for production
- **Branch from**: `main`
- **Merge into**: `main` AND `develop`
- **Naming**: `hotfix/<version>-<description>`
- **Example**: `hotfix/1.2.1-critical-security-fix`
- **Lifetime**: Temporary

#### Release Branches
- **Purpose**: Prepare for production release
- **Branch from**: `develop`
- **Merge into**: `main` AND `develop`
- **Naming**: `release/<version>`
- **Example**: `release/1.3.0`
- **Lifetime**: Temporary

## Workflow Examples

### Feature Development
```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/SF-123-user-authentication

# Work on feature
git add .
git commit -m "feat(auth): implement user login"

# Push and create PR
git push origin feature/SF-123-user-authentication
# Create PR: feature/SF-123-user-authentication → develop
```

### Hotfix
```bash
# Create hotfix branch
git checkout main
git pull origin main
git checkout -b hotfix/1.2.1-security-patch

# Fix the issue
git add .
git commit -m "fix(security): patch XSS vulnerability"

# Push and create PRs
git push origin hotfix/1.2.1-security-patch
# Create PR: hotfix/1.2.1-security-patch → main
# Create PR: hotfix/1.2.1-security-patch → develop
```

### Release Preparation
```bash
# Create release branch
git checkout develop
git pull origin develop
git checkout -b release/1.3.0

# Finalize release (version bump, changelog, etc.)
git add .
git commit -m "chore(release): prepare version 1.3.0"

# Push and create PRs
git push origin release/1.3.0
# Create PR: release/1.3.0 → main
# After merge to main, also merge to develop
```

## Branch Protection Rules

### `main` branch
- Require pull request reviews (minimum 2 approvals)
- Require status checks to pass
- Require branches to be up to date
- Require conversation resolution
- Require signed commits (optional)
- No direct pushes allowed

### `develop` branch
- Require pull request reviews (minimum 1 approval)
- Require status checks to pass
- No direct pushes allowed

## Pull Request Guidelines

1. **Create from correct branch**: Follow branching strategy
2. **Use PR template**: Fill out all sections
3. **Link issues**: Reference related tickets
4. **Request reviews**: Tag appropriate reviewers
5. **Pass CI checks**: All tests and builds must pass
6. **Resolve conflicts**: Keep branch up to date
7. **Squash commits**: Option to squash when merging

## Code Review Process

### For Reviewers
- Review code within 24 hours
- Check for code quality, tests, and documentation
- Provide constructive feedback
- Approve only when satisfied
- Use conventional comments (e.g., "nit:", "blocking:")

### For Authors
- Respond to all comments
- Make requested changes
- Re-request review after updates
- Don't merge until approved
- Delete branch after merge

## Best Practices

1. **Keep branches short-lived**: Merge within 2-3 days
2. **Sync regularly**: Pull from develop frequently
3. **One feature per branch**: Keep changes focused
4. **Write good PR descriptions**: Explain what and why
5. **Test before PR**: Ensure all tests pass locally
6. **Keep commits clean**: Follow commit standards
7. **Communicate**: Use PR comments for discussions

## Emergency Procedures

### Critical Production Bug
1. Create hotfix branch from `main`
2. Fix and test thoroughly
3. Fast-track PR review
4. Merge to `main` (triggers deployment)
5. Merge to `develop` to keep in sync
6. Tag release with patch version

### Rollback
1. Revert merge commit on `main`
2. Create hotfix with proper fix
3. Follow normal hotfix procedure
