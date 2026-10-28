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

The original v0.5 tests cover a controlled signing fixture. The v0.6 branch adds short real-compose signing and a second hardware test vector. The combined suite contains 21 automated tests.

## v0.6 Compose-Signing Security Checks

- The signing request is generated from the exact serialized draft bytes.
- The pending request retains the signed bytes and a compose snapshot.
- The extension re-reads Thunderbird compose details before export.
- The extension checks the draft again after asynchronous verification.
- Draft changes invalidate the pending signing request.
- The detached signature must verify against the original signed bytes.
- The signature creation time must match the pending signing request.
- Header-injection attempts are rejected.
- Unsupported attachments and compose formats are rejected.

Manual testing confirmed that modifying a draft after generating its
signing QR prevents export. This UI-level behavior is not yet covered
by a dedicated automated regression test.

A fresh 72-byte compose message was signed using physical Keycard Shell
hardware and exported after cryptographic verification.

Thunderbird recognized the resulting OpenPGP signature but reported
a sender-address mismatch with the public test certificate.

The signature authenticates the MIME body relative to the signing key.
It does not authenticate unsigned email headers or establish that
the signing key belongs to the claimed sender.


## v0.7 Sender Identity Security Review

The v0.7 workflow introduces explicit public-certificate selection.

Security checks:

- Require an explicitly approved 40-character certificate fingerprint.
- Compare the imported certificate with the approved fingerprint.
- Validate the OpenPGP primary key and User ID self-certification.
- Require the certified email address to match the compose sender.
- Reject malformed sender addresses and header injection.
- Use the selected certificate for hardware signature verification.
- Derive the OpenPGP key creation timestamp from that certificate.
- Preserve the existing draft-change and signature-timestamp checks.
- Invalidate pending signing requests when certificate selection changes.

The signing private key remains on Keycard hardware during the
demonstrated workflow.

A self-certified OpenPGP User ID is not independent proof that
the key owner controls the claimed email address.

The exported PGP/MIME signature covers the MIME body, not the
RFC 5322 From, To, Subject, or Date headers.

secp256k1 OpenPGP signing identities may also be linkable to
Ethereum addresses derived from the same underlying public key.

OpenPGP.js uses a scoped compatibility configuration for
secp256k1 while preserving its other configured restrictions.

Manual hardware testing confirmed that Thunderbird recognized
a valid sender-matched OpenPGP signature.

This implementation has not undergone an independent audit.

## Cryptographic Compatibility

The test certificate uses secp256k1 ECDSA with SHA-256.

OpenPGP.js restricts secp256k1 under its default curve policy. GapPGP uses an operation-scoped configuration to permit this curve for the known test certificate.

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

- v0.5 is restricted to a 73-byte fixture; v0.6 supports short ASCII plain-text compose drafts.
- General compose-message signing, including HTML, attachments, and long content, is not implemented.
- The current physical demonstration uses a 104-byte message limit.
- Live camera capture is blocked in the tested Thunderbird environment.
- Native Thunderbird send integration is not implemented.
- Attachment signing is not implemented.
- The pinned public certificate is a test fixture, not a general key trust mechanism.
- The implementation has not undergone an independent audit.

## Security Claims

Do not describe GapPGP as audited, production-ready, end-to-end encrypted, or a complete Thunderbird OpenPGP signing solution.
