/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://devfest2027.gdgnantes.com',
  generateRobotsTxt: true,
  transform: (config, path) => {
    if (!path.startsWith('/fr') && !path.startsWith('/en')) {
      return {};
    }
    return {
      loc: config.siteUrl + path.replace(/^\/fr/, ''),
      changefreq: 'daily',
      priority: 0.7,
    };
  },
};
