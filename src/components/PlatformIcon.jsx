function PlatformGlyph({ type }) {
  if (type === "windows") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 10.5 22 8v15H5V10.5Zm20.8-3L43 5v18H25.8V7.5ZM5 25.8h17v14.8L5 38V25.8Zm20.8 0H43V43l-17.2-2.4V25.8Z" />
      </svg>
    );
  }

  if (type === "macos") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M32.8 5.2c.2 3.1-1.1 6.1-3.1 8.3-2.1 2.3-5.4 4-8.3 3.8-.3-3 .9-6.2 2.9-8.4 2.2-2.4 5.8-4.1 8.5-3.7Zm8.1 29.6c-1 2.3-1.5 3.4-2.9 5.5-1.9 2.8-4.6 6.3-8 6.4-3 .1-3.8-1.9-7.8-1.9-4.1 0-5 1.9-7.9 1.8-3.4-.1-6-3.2-8-6-5.5-7.9-6-17.1-2.7-22 2.4-3.4 6.1-5.4 9.6-5.4 3.6 0 5.8 2 8.8 2s4.8-2 8.8-2c3 0 6.1 1.6 8.4 4.4-7.4 4.1-6.2 14.7 1.7 17.2Z" />
      </svg>
    );
  }

  if (type === "ios") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="15" y="5" width="18" height="38" rx="5" />
        <rect x="18.5" y="9" width="11" height="2" rx="1" fill="currentColor" opacity="0.45" />
        <circle cx="24" cy="37" r="1.5" fill="currentColor" opacity="0.45" />
      </svg>
    );
  }

  if (type === "android") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15.1 18.1h17.8c3.2 0 5.8 2.6 5.8 5.8v9.3c0 3.2-2.6 5.8-5.8 5.8H15.1a5.8 5.8 0 0 1-5.8-5.8v-9.3c0-3.2 2.6-5.8 5.8-5.8Zm1.5-6.2-3-5.1 2.2-1.3 3.2 5.5c1.5-.5 3.2-.8 5-.8s3.5.3 5 .8l3.2-5.5 2.2 1.3-3 5.1c3 1.5 5.3 3.9 6.4 6.9H10.2c1.1-3 3.4-5.4 6.4-6.9ZM17.7 27a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Zm12.6 0a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" />
      </svg>
    );
  }

  if (type === "tablet") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="9" y="5" width="30" height="38" rx="5" />
        <rect x="13" y="9" width="22" height="28" rx="2.5" fill="currentColor" opacity="0.28" />
        <circle cx="24" cy="40" r="1.4" fill="currentColor" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="6" y="9" width="36" height="30" rx="5" />
      <path d="M6 18h36" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.45" />
      <circle cx="15" cy="14" r="1.7" fill="currentColor" opacity="0.6" />
      <circle cx="21" cy="14" r="1.7" fill="currentColor" opacity="0.45" />
      <path d="M16 29c4-5.3 11.8-5.3 16 0m-16 0c4 5.4 11.8 5.4 16 0m-17.5 0h19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function PlatformIcon({ icon, className = "" }) {
  return (
    <span className={`platform-card is-${icon.theme}${className ? ` ${className}` : ""}`} title={icon.label}>
      <PlatformGlyph type={icon.type} />
    </span>
  );
}
