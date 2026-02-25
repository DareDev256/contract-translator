# Changelog

All notable changes to Contract Translator will be documented in this file.

## [1.0.1] - 2026-02-25

### Added
- `docs/api-billing-guide.md` — comprehensive guide covering AI API billing patterns for team deployments, per-seat invoice behavior across OpenAI/Anthropic/Google/Azure, cost estimation per contract analysis size, three team deployment strategies, and practical tips for managing invoice volume
- Documentation section in README linking to guides

## [1.0.0] - 2025-02-19

### Added
- Initial release — AI-powered legal contract analysis
- File upload (PDF, DOCX, TXT) and text paste input
- Clause-by-clause plain English translation via GPT-4
- Risk assessment with color-coded levels per clause
- Overall contract summary with key concerns and recommendations
- Searchable legal glossary with auto-extracted definitions
- Dark mode interface
- Lazy-init OpenAI client to prevent build-time crashes
