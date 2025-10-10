import type { MetaFunction } from "@remix-run/node";
import { Mail, Clock, Send } from "react-feather";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - reCraft" },
    { name: "description", content: "Get in touch with the reCraft team." },
  ];
};

export default function Contact() {
  return (
    <div
      className="minimal-content"
      style={{ paddingTop: "calc(var(--header-height) + var(--space-4xl))" }}
    >
      <div className="container">
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--space-4xl)",
            paddingBottom: "var(--space-2xl)",
            borderBottom: "1px solid var(--color-gray)",
          }}
        >
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: 600,
              marginBottom: "var(--space-lg)",
              letterSpacing: "-0.025em",
              color: "var(--color-black)",
            }}
          >
            Get In Touch
          </h1>
          <p
            style={{
              fontSize: "var(--text-xl)",
              color: "var(--color-dark-gray)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Have questions, suggestions, or want to collaborate? We'd love to
            hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            marginBottom: "var(--space-4xl)",
          }}
        >
          <div
            style={{
              background: "var(--color-pure-white)",
              border: "1px solid rgba(232, 232, 232, 0.6)",
              borderRadius: "16px",
              padding: "var(--space-2xl)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-xl)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "var(--space-xl)",
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--color-black)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    style={{
                      width: "100%",
                      padding: "0.875rem 1rem",
                      border: "1px solid rgba(232, 232, 232, 0.8)",
                      borderRadius: "8px",
                      fontSize: "var(--text-base)",
                      color: "var(--color-black)",
                      transition: "all var(--transition-base)",
                      outline: "none",
                    }}
                    placeholder="Your name"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-black)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(0, 0, 0, 0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232, 232, 232, 0.8)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--color-black)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    style={{
                      width: "100%",
                      padding: "0.875rem 1rem",
                      border: "1px solid rgba(232, 232, 232, 0.8)",
                      borderRadius: "8px",
                      fontSize: "var(--text-base)",
                      color: "var(--color-black)",
                      transition: "all var(--transition-base)",
                      outline: "none",
                    }}
                    placeholder="your@email.com"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-black)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(0, 0, 0, 0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(232, 232, 232, 0.8)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{
                    display: "block",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: "var(--color-black)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    border: "1px solid rgba(232, 232, 232, 0.8)",
                    borderRadius: "8px",
                    fontSize: "var(--text-base)",
                    color: "var(--color-black)",
                    transition: "all var(--transition-base)",
                    outline: "none",
                  }}
                  placeholder="What's this about?"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-black)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(0, 0, 0, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(232, 232, 232, 0.8)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: "var(--color-black)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    border: "1px solid rgba(232, 232, 232, 0.8)",
                    borderRadius: "8px",
                    fontSize: "var(--text-base)",
                    color: "var(--color-black)",
                    transition: "all var(--transition-base)",
                    outline: "none",
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                  placeholder="Your message..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-black)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(0, 0, 0, 0.05)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(232, 232, 232, 0.8)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "var(--color-black)",
                  color: "var(--color-pure-white)",
                  padding: "1rem 2rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "var(--text-base)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all var(--transition-base)",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-charcoal)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-black)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Send size={18} strokeWidth={1.6} aria-hidden="true" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div
          className="minimal-blog-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            marginBottom: "var(--space-4xl)",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(232, 232, 232, 0.6)",
              borderRadius: "12px",
              padding: "var(--space-xl)",
              textAlign: "center",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                background: "var(--color-pure-white)",
                borderRadius: "12px",
                marginBottom: "var(--space-md)",
                border: "1px solid rgba(232, 232, 232, 0.4)",
              }}
            >
              <Mail
                size={24}
                strokeWidth={1.6}
                color="var(--color-black)"
                aria-hidden="true"
              />
            </div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                marginBottom: "var(--space-sm)",
                color: "var(--color-black)",
              }}
            >
              Email Us
            </h3>
            <p
              style={{
                color: "var(--color-dark-gray)",
                fontSize: "var(--text-base)",
                marginBottom: "var(--space-sm)",
              }}
            >
              hello@recraftspace.com
            </p>
            <p
              style={{
                color: "var(--color-charcoal)",
                fontSize: "var(--text-sm)",
              }}
            >
              We typically respond within a few hours
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              border: "1px solid rgba(232, 232, 232, 0.6)",
              borderRadius: "12px",
              padding: "var(--space-xl)",
              textAlign: "center",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                background: "var(--color-pure-white)",
                borderRadius: "12px",
                marginBottom: "var(--space-md)",
                border: "1px solid rgba(232, 232, 232, 0.4)",
              }}
            >
              <Clock
                size={24}
                strokeWidth={1.6}
                color="var(--color-black)"
                aria-hidden="true"
              />
            </div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                marginBottom: "var(--space-sm)",
                color: "var(--color-black)",
              }}
            >
              Response Time
            </h3>
            <p
              style={{
                color: "var(--color-dark-gray)",
                fontSize: "var(--text-base)",
                marginBottom: "var(--space-sm)",
              }}
            >
              Within 24 hours
            </p>
            <p
              style={{
                color: "var(--color-charcoal)",
                fontSize: "var(--text-sm)",
              }}
            >
              Usually much faster during business hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
