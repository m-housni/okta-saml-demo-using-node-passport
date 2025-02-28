# Okta SAML implementation for SSO

This project demonstrates the implementation of SAML (Security Assertion Markup Language) for Single Sign-On (SSO) authentication.

## Features

- SAML-based authentication
- Single Sign-On (SSO) support
- Integration with Identity Providers (IdP)

## Prerequisites

- Node.js installed
- An Identity Provider (IdP) for SAML authentication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/okta-saml-demo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd okta-saml-demo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Add the environment variables:

```bash
SAML_ENTRYPOINT=https://your-okta-tenant.okta.com/app/example/sso/saml
SAML_ISSUER=my-saml-app
```

## Running the Application

1. Start the application:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000/auth/saml`.

## TODOS

- fix too many requests error
