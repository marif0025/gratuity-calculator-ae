export const seoDefaults = {
    siteName: 'Gratuity Calculator',
    baseUrl: process.env.SITE_URL || 'http://localhost:3000',
    defaultImages: {
        og: '/og-default.jpg',
        twitter: '/twitter-default.jpg'
    },
    defaultDescription: 'Calculate your gratuity with our comprehensive calculator. Plan your financial future with confidence.',
    defaultTitle: 'Gratuity Calculator - Calculate Your End of Service Benefits'
} as const
