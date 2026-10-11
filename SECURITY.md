# Security Policy

ShellPGP is an experimental Thunderbird MailExtension for
hardware-backed OpenPGP signing with Keycard Shell.

## Status

This project is a proof of concept, not an audited or
production-ready email-signing solution.

## Reporting Vulnerabilities

Please report suspected vulnerabilities privately to the
repository maintainer before publishing exploit details.

Do not include private keys, sensitive emails, or credentials
in vulnerability reports.

## Cryptographic Key Handling

The intended workflow keeps private signing keys on the
Keycard hardware.

ShellPGP generates signing requests and processes signatures.
It does not require importing the private signing key into
Thunderbird.

No formal security audit has been performed.
