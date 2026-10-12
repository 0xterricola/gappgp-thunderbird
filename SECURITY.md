# Security Policy

ShellPGP is an experimental Thunderbird MailExtension for hardware-backed OpenPGP signing with Keycard Shell.

## Status

This project is a proof of concept, not an audited or production-ready email-signing solution.

Do not use it to protect sensitive or consequential communications.

## Reporting Vulnerabilities

Please report suspected vulnerabilities privately to the repository maintainer before publishing exploit details.

Do not include private keys, sensitive emails, credentials, or other secrets in vulnerability reports.

## Cryptographic Key Handling

The demonstrated workflow keeps private signing keys on Keycard hardware.

ShellPGP generates signing requests and processes detached OpenPGP signatures. It does not require importing the private signing key into Thunderbird.

The extension verifies hardware-generated signatures before exporting supported test messages, including short plain-text compose drafts in the experimental v0.6 branch.

## Signature Verification

The fixture workflow uses:

- A pinned expected public-certificate fingerprint.
- OpenPGP.js detached-signature verification.
- Explicit secp256k1 compatibility configuration.
- Exact signed MIME fixture bytes.
- Reverification before signed-email export.

Malformed inputs and failed cryptographic verification must not produce a verified export.

The pinned test certificate is not a general-purpose identity or trust-management system.

## Security Boundaries

A valid signature authenticates the signed bytes relative to a particular cryptographic key.

It does not establish that the key belongs to the claimed sender or that the message is confidential.

The generated test email is signed but not encrypted.

## Audit Status

No formal security audit, penetration test, or independent security assessment has been performed.

## v0.7 Identity Handling

The identity-aware compose workflow requires an approved certificate
fingerprint and verifies the certificate's certified email against
the Thunderbird sender. Signing keys remain on Keycard hardware.

A valid signature or matching User ID does not independently
establish real-world identity or email-account ownership.

The implementation is experimental and has not been audited.
