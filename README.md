# reviews-service

Standalone, intentionally vulnerable product reviews microservice.

## Vulns
- Stored XSS via unescaped EJS render (CodeQL)
- Hardcoded AWS credentials in `config.js` (Secret Scanning)
- Outdated `ejs` 3.1.5 (Dependabot)
- Verbose error disclosure

## Run
```
npm install
npm start
```
