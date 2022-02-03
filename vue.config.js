module.exports = {
  transpileDependencies: ["vuetify"],

    devServer: {
    proxy:`http://192.168.1.10:1111`
  },
  pwa: {
    name: "Orizon",
    themeColor: "#004D40",
    msTileColor: "#004D40",
    manifestOptions: {
      background_color: "#004D40",
    },
  },
  outputDir: 'public (1)'
};
