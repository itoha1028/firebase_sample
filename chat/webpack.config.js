module.exports = {
  //mode: process.env.NODE_ENV || "development",
  entry: ["./src/main.js"],
  output: {
    filename: "bundle.js",
    path: __dirname + "/public"
  },
  module: {
    loaders: [
        {
          test: /\.vue?$/,
          exclude:/(node_modules)/,
          loader: 'vue-loader',
          query: {
            presets: []
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
        {
          test: /\.(jpg|png)$/,
          loaders: 'url-loader'
        },
    ]
  },
  // これをやらないと以下のようなエラーが出る
  // You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
        "node_modules"
    ],
    alias: {
        // vue.js のビルドを指定する
        vue: 'vue/dist/vue.common.js'
    }
},
};
