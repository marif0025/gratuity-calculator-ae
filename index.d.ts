
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV?: 'development' | 'production' | 'test';
        readonly SITE_URL?: string;
        readonly NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
        readonly NEXT_PUBLIC_SANITY_DATASET?: string;
        readonly NEXT_PUBLIC_SANITY_API_VERSION?: string;
    }
}

export { };