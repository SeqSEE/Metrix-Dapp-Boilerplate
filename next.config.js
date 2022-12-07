const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];
if (process.env.NODE_ENV === 'production')
  securityHeaders.push({
    key: 'Content-Security-Policy',
    value: "script-src 'self' data: 'unsafe-inline'"
  });

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: require.resolve('path-browserify')
      };
    }

    return config;
  }
};
