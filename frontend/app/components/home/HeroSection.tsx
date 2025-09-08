import { H1, LeadText, BodyText } from "../ui/Typography";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showScrollIndicator?: boolean;
  backgroundType?: "solid" | "gradient" | "pattern";
  className?: string;
}

export const HeroSection = ({
  title = "Welcome to reCraft",
  subtitle = "A modern tech blog built with Remix and Directus",
  description = "Thoughtful writing about technology, development, and the craft of creating digital experiences that matter.",
  showScrollIndicator = true,
  backgroundType = "gradient",
  className = ""
}: HeroSectionProps) => {
  const getBackgroundClass = () => {
    switch (backgroundType) {
      case "gradient":
        return "bg-gradient-to-br from-surface-50 via-accent-50/30 to-surface-100";
      case "pattern":
        return "bg-surface-50 bg-[radial-gradient(circle_at_1px_1px,rgba(193,155,106,0.1)_1px,transparent_0)] bg-[length:24px_24px]";
      default:
        return "bg-surface-50";
    }
  };

  return (
    <section className={`relative ${getBackgroundClass()} ${className}`}>
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4 animate-fade-in">
            <H1 className="font-serif text-5xl md:text-6xl lg:text-7xl">
              {title}
            </H1>
            <LeadText className="max-w-2xl mx-auto">
              {subtitle}
            </LeadText>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto animate-slide-up">
            <BodyText className="text-xl leading-relaxed">
              {description}
            </BodyText>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-slide-up">
            <a
              href="#latest-posts"
              className="group inline-flex items-center px-6 py-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-all duration-200 shadow-soft hover:shadow-soft-lg"
            >
              <span className="font-medium">Start Reading</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/about"
              className="inline-flex items-center px-6 py-3 text-primary-700 hover:text-accent-600 transition-colors duration-200 font-medium"
            >
              Learn more about me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a
            href="#latest-posts"
            className="flex flex-col items-center text-primary-600 hover:text-accent-600 transition-colors duration-200"
            aria-label="Scroll to content"
          >
            <span className="text-sm font-medium mb-2">Scroll</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
};

// Alternative minimal hero for inner pages
interface MinimalHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}

export const MinimalHero = ({ 
  title, 
  subtitle, 
  breadcrumbs,
  className = "" 
}: MinimalHeroProps) => {
  return (
    <section className={`bg-surface-50 border-b border-border-light ${className}`}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-primary-600">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && (
                      <svg className="w-4 h-4 mx-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {crumb.href ? (
                      <a 
                        href={crumb.href}
                        className="hover:text-accent-600 transition-colors duration-200"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-primary-900 font-medium">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Title and Subtitle */}
          <div className="space-y-4">
            <H1 className="font-serif">{title}</H1>
            {subtitle && (
              <LeadText className="text-primary-600">
                {subtitle}
              </LeadText>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats/Features section for homepage
interface StatsProps {
  stats: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  className?: string;
}

export const StatsSection = ({ stats, className = "" }: StatsProps) => {
  return (
    <section className={`py-16 bg-surface-100 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent-600">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-primary-900">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-primary-600">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};