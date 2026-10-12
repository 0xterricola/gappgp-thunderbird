# Limitations

ShellPGP remains an experimental proof of concept. v0.5 is fixture-only; the v0.6 development branch additionally supports short real Thunderbird drafts.

## Signing

- v0.5 uses a 73-byte MIME fixture; v0.6 has demonstrated a fresh 72-byte Thunderbird compose payload.
- v0.6 supports short ASCII plain-text drafts, not unrestricted compose-message signing.
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

- v0.5 exports the fixed fixture; v0.6 additionally exports newly signed short compose drafts.
- Thunderbird independently reports Good Digital Signature for this exported fixture.
- The v0.5 exporter does not sign the current draft; the separate v0.6 exporter does.
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

## v0.6 Additional Limitations

- Draft signing is limited to plain-text ASCII content.
- The current hardware-tested signing limit is 104 MIME bytes.
- The signed MIME body does not cover From, To, Subject, or Date.
- CC, BCC, and Reply-To are unsupported by the v0.6 exporter.
- The current verification certificate is a fixed public test key.
- General signing-key selection and identity provisioning are pending.
- Thunderbird reports an identity mismatch when the sender's email
  address does not match the signing certificate.
- The experimental v0.6 implementation has not been audited.
- v0.6 has not been released or merged into main.

## Upstream Issue

https://bugzilla.mozilla.org/show_bug.cgi?id=2080573
