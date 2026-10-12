# Limitations

ShellPGP v0.5 is an experimental fixed-fixture interoperability proof of concept.

## Signing

- The demonstrated message is a controlled 73-byte ASCII MIME fixture.
- Arbitrary Thunderbird compose-message signing is not implemented.
- The current physical demonstration uses a 104-byte message limit.
- Larger messages require additional protocol and implementation work.
- Attachment signing is not implemented.
- Native Thunderbird sending is not implemented.

## Response Handling

- Manual paste of a UR:BYTES signature response is supported.
- The response decoder and cryptographic verifier run inside Thunderbird.
- Live camera capture is blocked in the tested Thunderbird/macOS environment.
- In the Thunderbird 157.0.1 reproduction, camera requests remain pending.
- The upstream camera issue is tracked as Bug 2080573.
- Live QR scanner interoperability has not been demonstrated end to end.

## PGP/MIME Export

- The extension exports a signed `.eml` for the fixed test fixture.
- Thunderbird independently reports Good Digital Signature for this exported fixture.
- The exporter does not sign the current compose draft.
- The exporter uses the historical verified signature creation time for the test email Date header.
- The workflow does not send email or integrate with Thunderbird's native compose/send signing process.

## OpenPGP and Trust

- The current fixture uses ECDSA/secp256k1 with SHA-256.
- Verification is performed against a pinned public test certificate.
- The test certificate supports signing and certification.
- General-purpose certificate selection and trust management are not implemented.
- The generated message is signed, not encrypted.
- Cryptographic signature validity does not establish verified ownership of the signing identity.
- The implementation has not undergone a security audit.

## Upstream Issue

https://bugzilla.mozilla.org/show_bug.cgi?id=2080573
