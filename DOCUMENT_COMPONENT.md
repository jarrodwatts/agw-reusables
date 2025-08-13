# DOCUMENT_COMPONENT.md

This file provides guidance to Claude Code when writing component documentation for the AGW Reusables registry. Follow these patterns and style guidelines to ensure consistency with existing documentation.

## Writing Style Guidelines

### Tone and Voice
- **Professional but approachable**: Maintain authority without being overly formal
- **Concise and direct**: Get to the point quickly, avoid unnecessary elaboration
- **Action-oriented**: Focus on what the component does, not just what it is
- **Assume competence**: Don't over-explain basic React concepts, but be clear about specific functionality

### Technical Writing Patterns
- Use present tense for descriptions ("displays", "handles", "prompts")
- Start component descriptions with "A [type] that [action]" format
- Use consistent terminology across all documentation
- Reference external libraries with proper links in markdown format

## Documentation Structure

Every component documentation file MUST follow this exact structure:

### 1. Frontmatter
```yaml
---
title: Component Name
description: Brief, action-oriented description of what the component does
---
```

### 2. Component Preview
```markdown
<ComponentPreview name="component-name" />
```

### 3. Installation Section
```markdown
## Installation

[Prerequisites if any - link to required dependencies]

```bash
npx shadcn@latest add "https://agw-reusables.vercel.app/r/component-name.json"
```

[Additional setup steps if required]
```

### 4. Usage Section
```markdown
## Usage

[Basic usage example first]

### [Usage Variant 1]
[Progressive complexity - build from simple to advanced]

### [Usage Variant 2]
[Show different configurations/props]

### Using Hooks Directly
[If applicable, show how to use underlying hooks]
<CodeCollapsibleWrapper>
[Complex code examples in collapsible sections]
</CodeCollapsibleWrapper>
```

### 5. What's Included Section
```markdown
## What's included

This command installs the following files:

- `/components`
  - [`component-name.tsx`](#component-nametsx) - Brief description of main component

- `/hooks` (if applicable)
  - [`use-component-hook.ts`](#use-component-hookts) - Brief description

- `/lib` (if applicable)
  - [`utilities.ts`](#utilitests) - Brief description

[Individual file documentation sections follow]
```

### 6. Individual File Documentation
Each file gets its own section with:
- Descriptive heading using the filename
- Brief description of the file's purpose
- `<ComponentSource>` tag to display source code
- Props table for components (if applicable)

## Code Example Guidelines

### Code Block Standards
- Use `tsx` for React components
- Use `bash` for terminal commands  
- Use `ts` for TypeScript utilities
- Include file names in code block titles when relevant: `title="app/layout.tsx"`
- Use line highlighting for important lines: `showLineNumbers {1,6,10}`

### Code Example Progression
1. **Basic Usage**: Simple import and usage, minimal props
2. **Common Variants**: Different size/style options, common configurations
3. **Advanced Usage**: Complex configurations, custom styling, hook usage
4. **Integration Examples**: How to use with other components/libraries

### Code Collapsibility
- Use `<CodeCollapsibleWrapper>` for examples longer than 20 lines
- Use for advanced examples that might overwhelm beginners
- Always include the opening tag on its own line

## Component Props Documentation

When documenting component props, use this exact table format:

```markdown
#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `propName` | `string` | `undefined` | Clear description of what the prop does |
| `optionalProp` | `"value1" \| "value2"` | `"value1"` | Description with available options |
```

### Props Table Guidelines
- Always wrap prop names in backticks
- Use TypeScript union syntax for enums: `"sm" \| "md" \| "lg"`
- Use `undefined` for optional props without defaults
- Escape pipe characters in union types: `\|`
- Keep descriptions concise but complete

## File Path and Reference Standards

### File Paths
- Always use forward slashes
- Start from project root (no leading slash): `components/component-name.tsx`
- Use exact paths as they appear in the registry

### Internal Links
- Link to sections using kebab-case anchors: `[AGW Provider](/docs/essentials/agw-provider)`
- Link to file sections within the same doc: `[`component-name.tsx`](#component-nametsx)`
- Use descriptive link text that makes sense out of context

### External Links
- Always include proper markdown links for libraries: `[wagmi](https://wagmi.sh/react/api/WagmiProvider)`
- Link to official documentation when referencing external tools
- Use parenthetical explanations for library-specific terms

## Installation Documentation Patterns

### Prerequisites
- Always mention required dependencies upfront
- Link to dependency installation guides
- Use clear, actionable language: "Ensure you have installed and setup..."

### Environment Variables
- Show exact format with code blocks
- Include file names: `title=".env.local"`
- Add important notes about formatting (quotes, etc.)
- Provide generation commands when applicable

### Additional Setup
- Break down complex setup into clear steps
- Use numbered lists for sequential operations
- Include terminal commands with proper syntax highlighting

## Usage Example Patterns

### Basic Usage
- Always start with the simplest possible example
- Use realistic component names in examples
- Import from standard paths: `@/components/component-name`

### Variant Examples
- Show one concept per example
- Use descriptive function names: `CustomStyledProfile`, `ProfileSizes`
- Progress from simple to complex variations

### Hook Usage
- Show imports at the top
- Include realistic state management
- Demonstrate error handling and loading states
- Use proper TypeScript types

## Content Organization Guidelines

### Section Ordering
1. Basic functionality first
2. Styling/customization options
3. Advanced features
4. Direct hook usage
5. Integration examples

### Information Hierarchy
- Lead with most common use cases
- Progressive disclosure of complexity
- Group related examples together
- End with edge cases or advanced scenarios

## Component Source Display

### ComponentSource Usage
```markdown
<ComponentSource src="registry/new-york/blocks/component-name/component-name.tsx" />
```

### File Description Format
- Start with article: "A [component type] that [primary function]"
- Mention key features: "with automatic [feature], [feature], and [feature] support"
- Keep to 1-2 sentences maximum

## Special Elements and Formatting

### Collapsible Code Sections
- Use for examples over 20 lines
- Use for advanced/optional examples
- Always wrap the entire code block

### Inline Code
- Use backticks for: component names, prop names, function names, file names
- Use for values: `true`, `false`, `undefined`
- Use for short code snippets within sentences

### Emphasis
- Use **bold** for important concepts or warnings
- Use _italics_ sparingly, mainly for library names in context
- Avoid overuse of emphasis - let content speak for itself

## Error Prevention Guidelines

### Common Mistakes to Avoid
- Don't start descriptions with "This component..."
- Don't use future tense ("will display") - use present tense ("displays")
- Don't include unnecessary preamble in examples
- Don't duplicate information between sections
- Don't use overly technical jargon without context

### Quality Checklist
- [ ] Frontmatter follows exact format
- [ ] ComponentPreview uses correct component name
- [ ] Installation command uses correct URL
- [ ] Basic usage example is truly minimal
- [ ] Props table follows exact format
- [ ] File paths are accurate
- [ ] Code examples are syntactically correct
- [ ] Cross-references work correctly
- [ ] Consistent terminology throughout

## Environment-Specific Notes

### Development vs Production
- Mention environment differences when relevant
- Show configuration for both environments
- Use conditional code examples when needed

### Framework Integration
- Show Next.js specific patterns (app router, server components)
- Include proper import paths and usage patterns
- Mention framework-specific considerations

Remember: The goal is consistency, clarity, and usability. Every piece of documentation should help developers integrate components quickly and correctly into their projects.