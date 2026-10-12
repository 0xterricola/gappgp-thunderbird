# Privacy

ShellPGP is an experimental local Thunderbird MailExtension.

## Current Behavior

- Signing requests are generated locally.
- QR codes are rendered locally.
- The signing preview may read Thunderbird compose details.
- The v0.6 signing workflow temporarily retains draft bytes and compose metadata in memory to detect changes before export.
- Manual signature responses are processed inside the extension.
- Signature verification and signed MIME export run locally.
- The experimental camera scanner processes frames locally when camera access is available.
- Camera access is requested only following user interaction.
- Camera tracks are stopped after capture or when the page closes.
- The extension does not intentionally upload camera frames, signing requests, or signature responses to a remote service.

## Public Test Fixtures

The repository includes a public test certificate, fixed MIME message, detached signature, and UR:BYTES response.

These materials are intended for reproducible interoperability testing.

They contain public cryptographic material and test identity information, not private signing keys.

Do not replace them with real private messages or sensitive personal data.

## Limitations

The project has not undergone an independent privacy review.

Thunderbird and macOS may maintain diagnostic logs and camera-permission records.

The current implementation does not provide encrypted email or anonymity guarantees.

## v0.7 Local Certificate Selection

The sender-specific public OpenPGP certificate is selected locally
using a Thunderbird file picker. The certificate and its identifying
User ID are processed in the extension for signing validation.

The personal demonstration certificate, QR capture, and email
screenshots are not included in the public repository.

OpenPGP public keys and User IDs may expose identifying information.
Keys derived from secp256k1 material may also be linkable to
Ethereum identities.
