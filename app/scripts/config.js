angular.module('xRankApp')
    .config(function (urlHelperProvider) {
      urlHelperProvider.setApiUrl('https://xfind.irmc.gob.es:9000');
      // Removes /xx/ idomatic path
      urlHelperProvider.setUrlTrimPattern(/(?:^http[s]?:\/\/.*?)(\/[a-z]{2}\/)/, '/xx/');
    });