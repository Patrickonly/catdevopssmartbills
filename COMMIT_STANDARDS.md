# Commit Message Standards

This project follows the **Conventional Commits** specification for clear and consistent commit messages.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Scope

The scope should be the name of the affected module or component (e.g., api, ui, auth, database).

## Subject

- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No period (.) at the end
- Maximum 50 characters

## Body

- Use imperative, present tense
- Include motivation for the change and contrast with previous behavior
- Wrap at 72 characters

## Footer

- Reference issues: `Fixes #123`, `Closes #456`
- Breaking changes: Start with `BREAKING CHANGE:` followed by description

## Examples

### Feature
```
feat(auth): add JWT token authentication

Implement JWT-based authentication system with refresh tokens.
Tokens expire after 24 hours and can be refreshed using refresh tokens.

Closes #45
```

### Bug Fix
```
fix(api): handle null values in user profile endpoint

Previously, the endpoint would crash when encountering null values.
Now properly handles and returns default values.

Fixes #123
```

### Breaking Change
```
feat(api): change response format for user endpoints

BREAKING CHANGE: User endpoints now return data in camelCase instead of snake_case.
Clients will need to update their response parsing logic.

Closes #78
```

### Simple Commit
```
docs: update installation instructions
```

## Best Practices

1. **Atomic commits**: Each commit should represent a single logical change
2. **Commit often**: Make small, frequent commits rather than large, infrequent ones
3. **Test before committing**: Ensure all tests pass before committing
4. **Review your changes**: Use `git diff` to review changes before committing
5. **Write meaningful messages**: Explain why, not just what

## Prohibited Practices

❌ Vague messages like "fix stuff" or "update code"
❌ Combining unrelated changes in a single commit
❌ Committing broken or untested code
❌ Including sensitive information (passwords, API keys, etc.)
