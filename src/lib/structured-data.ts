export function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://tubegenie-frontend.vercel.app/#softwareapplication",
        name: "TubeGenie",
        description:
          "AI-powered YouTube content generator that creates engaging titles, descriptions, tags, scripts, and thumbnail ideas using advanced AI models like DeepSeek, Gemini, and GLM.",
        url: "https://tubegenie-frontend.vercel.app",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free forever plan with access to multiple AI models",
        },
        featureList: [
          "AI-powered content generation",
          "Multiple AI model support (DeepSeek, Gemini, GLM)",
          "SEO-optimized content",
          "YouTube title generation",
          "Video description creation",
          "Tag suggestions",
          "Script outlines",
          "Thumbnail ideas",
          "Content history tracking",
          "Analytics dashboard",
        ],
        screenshot: "https://tubegenie-frontend.vercel.app/og-image.jpg",
        author: {
          "@type": "Organization",
          name: "TubeGenie Team",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://tubegenie-frontend.vercel.app/#website",
        url: "https://tubegenie-frontend.vercel.app",
        name: "TubeGenie - AI YouTube Content Generator",
        description:
          "Generate viral YouTube content with AI. Create titles, descriptions, scripts, and more.",
        publisher: {
          "@id": "https://tubegenie-frontend.vercel.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://tubegenie-frontend.vercel.app/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://tubegenie-frontend.vercel.app/#organization",
        name: "TubeGenie",
        url: "https://tubegenie-frontend.vercel.app",
        logo: {
          "@type": "ImageObject",
          url: "https://tubegenie-frontend.vercel.app/logo.png",
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://twitter.com/tubegenie",
          "https://linkedin.com/company/tubegenie",
          "https://github.com/group14000/tubegenie-frontend",
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://tubegenie-frontend.vercel.app/#webpage",
        url: "https://tubegenie-frontend.vercel.app",
        name: "TubeGenie - AI-Powered YouTube Content Generator",
        description:
          "Generate engaging YouTube titles, descriptions, tags, scripts, and thumbnail ideas with AI. Boost your channel growth with SEO-optimized content.",
        isPartOf: {
          "@id": "https://tubegenie-frontend.vercel.app/#website",
        },
        about: {
          "@id": "https://tubegenie-frontend.vercel.app/#softwareapplication",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://tubegenie-frontend.vercel.app/og-image.jpg",
        },
        datePublished: "2024-01-01",
        dateModified: "2025-10-19",
      },
    ],
  };

  return structuredData;
}
