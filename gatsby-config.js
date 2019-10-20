module.exports = {
  siteMetadata: {
    title: 'Dev Log',
    siteDescription: 'The journey through tech of Yannick Gladow',
    authorName: 'Yannick Gladow'
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'GatsbyJS',
        short_name: 'GatsbyJS',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone'
        // icon: 'public/favicon.png' // This path is relative to the root of the site.
      }
    },
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
