# Security Review

## Current Architecture

Thunderbird MailExtension
  -> CBOR signing request
  -> UR:BYTES QR code
  -> Keycard Shell hardware approval
  -> OpenPGP signature response

## Verified Behavior

- Browser-generated signing requests match the Node.js
  reference implementation byte for byte.
- A physical Keycard Shell accepts the generated QR request.
- Hardware-generated OpenPGP signatures have been independently
  verified using GnuPG.

## Trust Boundaries

- Thunderbird and extension code are not trusted with the
  hardware private signing key.
- The user must review the signing request on Keycard Shell.
- Displaying a QR code does not establish signature validity.
- Capturing a signature response does not establish validity
  until cryptographic verification succeeds.

## Current Risks

- Signing currently uses a fixed MIME test fixture.
- Arbitrary compose-message signing is not implemented.
- QR response capture is experimental.
- Response verification is not yet integrated into the extension.
- Native Thunderbird send integration is not implemented.
- The implementation has not undergone a security audit.

## Security Claims

Do not describe ShellPGP as audited, production-ready, or
a complete Thunderbird OpenPGP signing solution.
