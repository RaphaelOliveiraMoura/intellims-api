const requester = require('./utils/requester');
const urlHelper = require('./utils/url-helper');
const fileSystem = require('fs');
const path = require('path');

const urlWithParams = urlHelper.addParamsToUrl(
  'http://app.intellims.com.br/api/web/v2/analytics/authors', {
    sid: 'fb123c3afd9e47b08e17014fad76dd6c',
    q: 'gr_%3Agames',
    // filters: '"pdr":"20190724%200:0-20190730%2023:59","keyword":"rocket","review":"NOT_REVISED"',
    filters: '%22pdr%22%3A%2220190724%200%3A0-20190730%2023%3A59%22%2C%22review%22%3A%22NOT_REVISED%22',
    // visibility: 'NOT_REVISED',
    // page: 1,
    max: 100000
  });

requester(urlWithParams).then((data) => {
  const filePath = path.resolve(__dirname, '../outputs/authors/authors.json');
  try {
    fileSystem.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Arquivo salvo com sucesso em:', filePath);
    console.log(`Foram savlos ${data.authors.length} autores`);
  } catch (error) {
    console.log('Erro ao salvar arquivo:', error);
  }
}).catch((error) => {
  console.log('Erro ao realizar requisição:', error);
});