module.exports = {
  siteMetadata: {
    title: 'Dev Log',
    siteDescription: 'The journey through Tech of Yannick Gladow',
    authorName: 'Yannick Gladow'
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/blog-posts`
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
            `gatsby-remark-copy-linked-files`,
            {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0,
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            }
          },
        ]
      }
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-styled-components'
  ]
}
