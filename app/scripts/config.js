angular.module('xRankApp')
    .config(function (urlHelperProvider) {
      urlHelperProvider.setApiUrl('https://example.org:9000');
      // Removes /xx/ idomatic path
      urlHelperProvider.setUrlTrimPattern(/(?:^http[s]?:\/\/.*?)(\/[a-z]{2}\/)/, '/xx/');
    });
