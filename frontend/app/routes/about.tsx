import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Check, Code, Cloud, Cpu } from "react-feather";

export const meta: MetaFunction = () => {
  return [
    { title: "About - reCraft" },
    {
      name: "description",
      content:
        "Learn more about reCraft and our mission to share knowledge through technology.",
    },
  ];
};

export default function About() {
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
            About reCraft
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
            A modern platform for sharing technology insights, tutorials, and
            industry knowledge.
          </p>
        </div>

        {/* Main Content */}
        <div
          className="minimal-blog-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          }}
        >
          <div
            style={{
              background: "var(--color-pure-white)",
              border: "1px solid rgba(232, 232, 232, 0.6)",
              borderRadius: "12px",
              padding: "var(--space-xl)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 600,
                marginBottom: "var(--space-md)",
                color: "var(--color-black)",
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                color: "var(--color-charcoal)",
                lineHeight: 1.7,
                marginBottom: "var(--space-lg)",
                fontSize: "var(--text-base)",
              }}
            >
              reCraft is dedicated to creating a collaborative environment where
              developers, engineers, and technology enthusiasts can share
              knowledge, learn from each other, and stay updated with the latest
              trends in the tech world.
            </p>
            <p
              style={{
                color: "var(--color-charcoal)",
                lineHeight: 1.7,
                fontSize: "var(--text-base)",
              }}
            >
              We believe that knowledge grows when shared, and our platform aims
              to be a catalyst for learning and innovation in the technology
              community.
            </p>
          </div>

          <div
            style={{
              background: "var(--color-pure-white)",
              border: "1px solid rgba(232, 232, 232, 0.6)",
              borderRadius: "12px",
              padding: "var(--space-xl)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 600,
                marginBottom: "var(--space-md)",
                color: "var(--color-black)",
              }}
            >
              What We Cover
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-sm)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-sm)",
                }}
              >
                <Check
                  size={20}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ marginTop: "2px" }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: "var(--color-charcoal)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  Web Development & Modern Frameworks
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-sm)",
                }}
              >
                <Check
                  size={20}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ marginTop: "2px" }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: "var(--color-charcoal)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  Cloud Technologies & DevOps
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-sm)",
                }}
              >
                <Check
                  size={20}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ marginTop: "2px" }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: "var(--color-charcoal)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  Software Architecture & Best Practices
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-sm)",
                }}
              >
                <Check
                  size={20}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ marginTop: "2px" }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: "var(--color-charcoal)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  Emerging Technologies & Trends
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-sm)",
                }}
              >
                <Check
                  size={20}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ marginTop: "2px" }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: "var(--color-charcoal)",
                    fontSize: "var(--text-base)",
                  }}
                >
                  Developer Tools & Productivity
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(232, 232, 232, 0.6)",
            borderRadius: "16px",
            padding: "var(--space-2xl)",
            marginTop: "var(--space-4xl)",
            marginBottom: "var(--space-4xl)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 600,
              marginBottom: "var(--space-lg)",
              textAlign: "center",
              color: "var(--color-black)",
            }}
          >
            Built With Modern Tech
          </h2>
          <p
            style={{
              color: "var(--color-dark-gray)",
              marginBottom: "var(--space-2xl)",
              textAlign: "center",
              fontSize: "var(--text-base)",
              maxWidth: "600px",
              margin: "0 auto var(--space-2xl)",
            }}
          >
            This blog itself is built using cutting-edge technologies, serving
            as a practical example of modern web development practices.
          </p>

          <div
            className="minimal-blog-grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "var(--color-pure-white)",
                  borderRadius: "12px",
                  padding: "var(--space-lg)",
                  marginBottom: "var(--space-md)",
                  border: "1px solid rgba(232, 232, 232, 0.4)",
                }}
              >
                <Code
                  size={32}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ margin: "0 auto var(--space-sm)" }}
                  aria-hidden="true"
                />
                <h3
                  style={{
                    fontWeight: 600,
                    color: "var(--color-black)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  Frontend
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-dark-gray)",
                }}
              >
                Remix + React + TypeScript
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "var(--color-pure-white)",
                  borderRadius: "12px",
                  padding: "var(--space-lg)",
                  marginBottom: "var(--space-md)",
                  border: "1px solid rgba(232, 232, 232, 0.4)",
                }}
              >
                <Cloud
                  size={32}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ margin: "0 auto var(--space-sm)" }}
                  aria-hidden="true"
                />
                <h3
                  style={{
                    fontWeight: 600,
                    color: "var(--color-black)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  Backend
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-dark-gray)",
                }}
              >
                Directus + MySQL
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  background: "var(--color-pure-white)",
                  borderRadius: "12px",
                  padding: "var(--space-lg)",
                  marginBottom: "var(--space-md)",
                  border: "1px solid rgba(232, 232, 232, 0.4)",
                }}
              >
                <Cpu
                  size={32}
                  strokeWidth={1.6}
                  color="var(--color-black)"
                  style={{ margin: "0 auto var(--space-sm)" }}
                  aria-hidden="true"
                />
                <h3
                  style={{
                    fontWeight: 600,
                    color: "var(--color-black)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  Deployment
                </h3>
              </div>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-dark-gray)",
                }}
              >
                Docker + Railway
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div
          style={{
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)",
            borderRadius: "16px",
            padding: "var(--space-2xl)",
            border: "1px solid rgba(232, 232, 232, 0.6)",
            marginBottom: "var(--space-4xl)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 600,
              marginBottom: "var(--space-md)",
              color: "var(--color-black)",
            }}
          >
            Get In Touch
          </h2>
          <p
            style={{
              marginBottom: "var(--space-lg)",
              color: "var(--color-dark-gray)",
              fontSize: "var(--text-base)",
            }}
          >
            Have questions, suggestions, or want to contribute? We'd love to
            hear from you.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-block",
              background: "var(--color-black)",
              color: "var(--color-pure-white)",
              padding: "0.875rem 2rem",
              borderRadius: "8px",
              fontWeight: 600,
              transition: "all var(--transition-base)",
              textDecoration: "none",
              fontSize: "var(--text-base)",
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
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
