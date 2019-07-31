const requester = require('./utils/requester');
const urlHelper = require('./utils/url-helper');
const fileSystem = require('fs');
const path = require('path');

const urlWithParams = urlHelper.addParamsToUrl(
  'http://app.intellims.com.br/api/web/v2/mention/list', {
    sid: 'fb123c3afd9e47b08e17014fad76dd6c',
    q: 'gr_%3Agames',
    // filters: '"pdr":"20190724%200:0-20190730%2023:59","keyword":"cs,go","review":"NOT_REVISED"',
    filters: '%22pdr%22%3A%2220190724%200%3A0-20190730%2023%3A59%22%2C%22review%22%3A%22NOT_REVISED%22',
    // visibility: 'NOT_REVISED',
    // page: 1,
    max: 100000
  });

requester(urlWithParams).then((data) => {
  try {
    const filePath = path.resolve(__dirname, '../outputs/mentions/mentions.json');
    const fileMappedPath = path.resolve(__dirname, '../outputs/mentions/mapped-mentions.json');
    const mappedMentions = data.mentions.map(mention => {
      const allSources = Object.keys(data.sources).map(key => {
        return {
          'id': data.sources[key].id,
          'title': data.sources[key].label
        }
      });
      const mentionSource = allSources.filter(source => source.id == mention.source)[0].title;
      return {
        'url': mention.mention_url,
        'source': mentionSource,
        'title': mention.title,
        'text': mention.body,
        'sentiment': mention.sentiment,
        'author': mention.author
      }
    });

    fileSystem.writeFileSync(fileMappedPath, JSON.stringify(mappedMentions, null, 2), 'utf8');
    fileSystem.writeFileSync(filePath, JSON.stringify(data.mentions, null, 2), 'utf8');
    console.log(`Foram salvas ${data.mentions.length} menções`);
  } catch (error) {
    console.log('Erro ao salvar arquivo:', error);
  }
}).catch((error) => {
  console.log('Erro ao realizar requisição:', error);
});