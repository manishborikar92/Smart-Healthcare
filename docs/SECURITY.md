# Security

## Data Handling

Smart Healthcare AI processes skin condition images for classification. The application handles potentially sensitive health data (medical images) with the following protections:

**No server-side storage.** The application has no backend server, database, or file storage. Uploaded images are processed entirely in the user's browser and sent directly to the Hugging Face Space via the `@gradio/client` WebSocket connection. No images are stored, logged, or persisted by the application.

**Transient processing.** The image `File` object exists only in browser memory during the prediction lifecycle. The preview URL is created with `URL.createObjectURL()` and explicitly revoked when the image is cleared or the component unmounts.

**No user accounts.** The application does not implement authentication, authorization, or user sessions. No personal data is collected or stored.

## Security Headers

Security headers are configured in `web/next.config.mjs` and applied to all routes (`/(.*)`):

| Header                    | Value                                                    | Purpose                                    |
|---------------------------|----------------------------------------------------------|--------------------------------------------|
| `X-Frame-Options`        | `DENY`                                                   | Prevents clickjacking by blocking iframes  |
| `X-Content-Type-Options` | `nosniff`                                                | Prevents MIME-type sniffing                |
| `Referrer-Policy`        | `strict-origin-when-cross-origin`                        | Limits referrer information on cross-origin requests |
| `Permissions-Policy`     | `camera=(), microphone=(), geolocation=()`               | Disables camera, microphone, and geolocation APIs |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload`        | Enforces HTTPS with 2-year preload         |

## External Connections

The application makes exactly one external connection:

| Destination                                              | Protocol  | Purpose                          |
|----------------------------------------------------------|-----------|----------------------------------|
| `theodinproject/skin_cancer_model_resnet50v2` (Hugging Face) | WebSocket | Model inference via Gradio client |

The Hugging Face Space URL is hardcoded in `web/src/components/features/Upload.jsx`. The connection is managed by the `@gradio/client` library, which handles TLS and protocol negotiation.

## Dependency Auditing

Audit npm dependencies for known vulnerabilities:

```bash
cd web
npm audit
```

Review and apply available fixes:

```bash
npm audit fix
```

## Medical Disclaimer

The application displays medical disclaimers at two levels:

1. **Footer disclaimer** — A persistent warning on every page stating the tool is for educational purposes only and should not replace professional medical advice.

2. **Result-level disclaimer** — When the AI model returns a `danger` (Malignant) or `warning` (Burn Skin) classification, an additional inline disclaimer is shown advising the user to consult a qualified healthcare professional.

These disclaimers are implemented in `web/src/components/layout/Footer.jsx` and `web/src/components/features/Results.jsx` respectively.

## Known Limitations

- No Content Security Policy (CSP) header is configured. The application connects to external Hugging Face endpoints, which would require careful CSP allowlisting.
- No rate limiting is implemented on the client-side Gradio connection. The external Hugging Face Space may have its own rate limits.
- The `@gradio/client` library manages its own WebSocket security. The application does not implement additional transport-layer controls.
