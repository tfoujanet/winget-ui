module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devtool: "source-map",
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          artifactName: "${productName}-Setup-${version}.${ext}"
        }
      },
    },
  },
};
