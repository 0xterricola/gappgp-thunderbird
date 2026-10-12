# Security Review

## Current Architecture

Thunderbird MailExtension
-> CBOR signing request
-> UR:BYTES QR code
-> Keycard Shell hardware approval
-> hardware signature response
-> UR decoding inside Thunderbird
-> OpenPGP signature validation
-> cryptographic verification
-> signed PGP/MIME export

The demonstrated return path currently uses manual UR:BYTES paste instead of live camera capture.

## Verified Behavior

- Browser signing requests match the Node.js reference implementation byte for byte.
- Physical Keycard Shell accepts the generated signing request.
- Hardware-generated OpenPGP signatures verify independently with GnuPG.
- The browser decoder recovers the expected 119-byte detached signature.
- OpenPGP.js verifies the hardware signature inside Thunderbird.
- Modified message bytes and modified signature bytes are rejected.
- The exporter rejects content outside the supported 73-byte test fixture.
- The exporter reverifies the signature before constructing PGP/MIME.
- Thunderbird independently reports **Good Digital Signature** for the exported test email.
- Seven automated regression tests pass.

These tests cover a controlled signing fixture, not arbitrary message signing.

## Cryptographic Compatibility

The test certificate uses secp256k1 ECDSA with SHA-256.

OpenPGP.js restricts secp256k1 under its default curve policy. ShellPGP uses an operation-scoped configuration to permit this curve for the known test certificate.

Other configured curve restrictions are preserved.

This compatibility exception does not represent a security audit or a general recommendation to accept arbitrary secp256k1 certificates.

## Trust Boundaries

- The extension does not receive the hardware private signing key.
- The user must review and approve the signing operation on Keycard Shell.
- QR content is untrusted input until decoded and validated.
- Successful decoding alone does not establish cryptographic validity.
- Signature verification must use the intended message bytes and expected public certificate.
- A valid signature is not proof of a verified human identity.
- Signed content is not necessarily confidential.

## MIME and Timestamp Handling

The exported PGP/MIME test message preserves the exact signed MIME bytes and required CRLF conventions.

For the historical test fixture, the email Date header is derived from the verified OpenPGP signature creation timestamp to avoid an artificial date mismatch.

Production email signing must create and sign the actual message during the compose/send workflow rather than reuse a historical signature or backdate an ordinary message.

## Current Risks and Limitations

- Signing and export are restricted to a known 73-byte test fixture.
- Arbitrary compose-message signing is not implemented.
- The current physical demonstration uses a 104-byte message limit.
- Live camera capture is blocked in the tested Thunderbird environment.
- Native Thunderbird send integration is not implemented.
- Attachment signing is not implemented.
- The pinned public certificate is a test fixture, not a general key trust mechanism.
- The implementation has not undergone an independent audit.

## Security Claims

Do not describe ShellPGP as audited, production-ready, end-to-end encrypted, or a complete Thunderbird OpenPGP signing solution.
