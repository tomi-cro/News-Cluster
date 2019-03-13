const Parser = require('rss-parser');
const moment = require('moment');

const parser = new Parser({
  customFields: {
    item: ['description', 'id'],
  },
});

const now = moment();

exports.getPosts = (req, res) => {
  (async () => {
    let id = 0;
    let feed = await parser.parseURL('https://www.jutarnji.hr/rss');
    console.log(feed.title);
    const news = [];
    feed.items.forEach((item) => {
      const dateJutarnji = moment(item.pubDate);
      news.push({
        id,
        title: item.title,
        link: item.link,
        description: item.description,
        picture: item.enclosure.url,
        portal: 'jutarnji',
        date: now.diff(dateJutarnji, 'seconds'),
      });
      id += 1;
    });
    feed = await parser.parseURL('https://www.index.hr/rss');
    console.log(feed.title);
    feed.items.forEach((item) => {
      const dateIndex = moment(item.pubDate);
      news.push({
        id,
        title: item.title,
        link: item.link,
        portal: 'index',
        description: item.description.split('>')[1],
        picture: item.description.split('"')[1],
        date: now.diff(dateIndex, 'seconds'),
      });
      id += 1;
    });
    feed = await parser.parseURL('https://www.24sata.hr/feeds/najnovije.xml');
    console.log(feed.title);
    feed.items.forEach((item) => {
      const date24Sata = moment(item.pubDate);
      news.push({
        id,
        title: item.title,
        portal: '24sata',
        link: item.link,
        description: item.description.split('>')[1],
        picture: item.description.split('"')[1],
        date: now.diff(date24Sata, 'seconds'),
      });
      id += 1;
    });
    res.status(200).json({ news });
  })();
};
