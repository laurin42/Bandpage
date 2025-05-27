"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

interface NewsletterFormProps {
  onSignup: (email: string) => Promise<{ success: boolean; message: string }>;
  className?: string;
  inputPlaceholder?: string;
}

export default function NewsletterForm({
  onSignup,
  className = "",
  inputPlaceholder = "Deine E-Mail-Adresse",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);

    if (!email || !email.includes("@")) {
      setMessage("Bitte gebe eine gültige E-Mail-Adresse ein.");
      setIsLoading(false);
      return;
    }

    const result = await onSignup(email);

    setMessage(result.message);
    setIsSuccess(result.success);
    setIsLoading(false);

    if (result.success) {
      setEmail("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`band-newsletter-form ${className}`.trim()}
    >
      <div className="form-group">
        <input
          className="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={inputPlaceholder}
          disabled={isLoading}
          aria-label="Email for newsletter"
          required
        />
        <button type="submit" disabled={isLoading} className="submit-button">
          <Send size={18} strokeWidth={2} />
        </button>
      </div>
      {message && (
        <p className={`message ${isSuccess ? "success" : "error"}`}>
          {message}
        </p>
      )}
      <style jsx>{`
        .band-newsletter-form {
          --form-primary-color: #f02525;
          --form-primary-hover-color: #c01f1f;
          --form-text-color: #e0e0e0;
          --form-input-bg: #2c2c2c;
          --form-input-border: #444;
          --form-input-focus-border: var(--form-primary-color);
          --form-success-bg: #1a3c30;
          --form-success-text: #a7f3d0;
          --form-error-bg: #4a1e1e;
          --form-error-text: #fca5a5;

          display: flex;
          flex-direction: column;
          gap: clamp(0.5rem, 2vw, 0.8rem);
          width: 100%;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
        }
        .form-group {
          display: flex;
          flex-direction: row;
          gap: clamp(0.5rem, 1.5vw, 0.75rem);
          width: 100%;
          align-items: stretch;
        }
        .form-group input[type="email"] {
          flex-grow: 1;
          min-width: 0;
          padding: clamp(0.6rem, 2vw, 0.9rem) clamp(0.75rem, 2.5vw, 1rem);
          font-size: clamp(0.9rem, 2.2vw, 1.1rem);
          color: var(--form-text-color);
          background-color: var(--form-input-bg);
          border: 1px solid var(--form-input-border);
          border-radius: 6px;
          box-sizing: border-box;
          line-height: 1.4;
        }
        .form-group input[type="email"]::placeholder {
          color: #888;
        }
        .form-group input[type="email"]:focus {
          outline: none;
          border-color: var(--form-input-focus-border);
          box-shadow: 0 0 0 2px rgba(240, 37, 37, 0.3);
        }
        .form-group button {
          padding: clamp(0.6rem, 2vw, 0.9rem) clamp(1rem, 3vw, 1.75rem);
          font-size: clamp(0.9rem, 2.2vw, 1.1rem);
          font-weight: bold;
          background-color: var(--form-primary-color);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .form-group button:hover:not(:disabled) {
          background-color: var(--form-primary-hover-color);
        }
        .form-group button:disabled {
          background-color: #555;
          cursor: not-allowed;
          opacity: 0.7;
        }
        .message {
          padding: clamp(0.5rem, 1.5vw, 0.75rem);
          font-size: clamp(0.85rem, 2vw, 1rem);
          border-radius: 4px;
          text-align: center;
          line-height: 1.5;
        }
        .message.success {
          background-color: var(--form-success-bg);
          color: var(--form-success-text);
        }
        .message.error {
          background-color: var(--form-error-bg);
          color: var(--form-error-text);
        }
      `}</style>
    </form>
  );
}
