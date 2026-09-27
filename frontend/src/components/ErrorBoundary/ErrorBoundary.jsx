import React from "react";

// Keeps a crash in a small third-party widget (like the Google sign-in
// button) from taking down the whole page. If the wrapped content throws,
// we quietly render nothing there instead of unmounting everything else
// (forms, links, etc.) around it.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
