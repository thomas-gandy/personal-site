import type { NextConfig } from "next";

const mdxLoaderOptions = {
  providerImportSource: 'next-mdx-import-source-file',
  remarkPlugins: [
    ['remark-frontmatter'],
    ['remark-mdx-frontmatter', { name: 'metadata' }],
  ],
}

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ['three'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  turbopack: {
    rules: {
      '*.mdx': {
        loaders: [
          {
            loader: '@next/mdx/mdx-js-loader',
            options: mdxLoaderOptions,
          },
        ],
        as: '*.tsx',
      },
    },
    resolveAlias: {
      'next-mdx-import-source-file':
        '@vercel/turbopack-next/mdx-import-source',
    },
  },
  webpack(config) {
    config.resolve.alias['next-mdx-import-source-file'] = [
      'private-next-root-dir/src/mdx-components',
      'private-next-root-dir/mdx-components',
      '@mdx-js/react',
    ]
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: '@next/mdx/mdx-js-loader',
          options: mdxLoaderOptions,
        },
      ],
    })
    return config
  },
};

export default nextConfig;
