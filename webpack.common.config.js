const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Entry points
const entries = {};

glob.sync('./src/js/**/[^_]*.js').map((file) => {
  entries[file.match(/src(\/js\/|\/)([a-zA-Z0-9_/]*\/?[a-zA-Z0-9_]+)\.js/i)[2]] = [file]
});

const webpackConfig = {
  entry: entries,
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '.dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@JS': path.resolve(__dirname, 'src/js'),
      '@SCSS': path.resolve(__dirname, 'src/scss'),
    },
    extensions: ['*', '.js', '.vue', '.json', 'scss'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc',
              enforce: 'pre',
            },
          },
        ],
      },
      {
        test: /\.ect$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          {
            loader: 'webpack-ect-loader',
            options: {
              root: path.resolve(__dirname, 'src/ect'),
              gzip: true,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          // { loader: 'vue-style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'clean-css-loader',
            options: {
              level: 2,
            },
          },
          { loader: 'group-css-media-queries-loader' },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              outputPath: 'img/',
              name: '[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: [0.65, 0.8],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlReplaceWebpackPlugin([
      {
        pattern: /(<!--\s*|@@)(css|js):([\w-\/]+)(\s*-->)?/g,
        replacement(match, $1, type, file, $4, index, input) {
          const tpl = {
            css: '<link rel="stylesheet" href="/css/%s">',
            js: '<script src="/js/%s"></script>',
          };

          // const url = file + '-bundle-' + hash + '.' + type;
          const url = `${file}.${type}`;

          // $1==='@@' <--EQ--> $4===undefined
          return $4 === undefined ? url : tpl[type].replace('%s', url)
        },
      },
    ]),
    new MiniCssExtractPlugin({
      // filename: 'css/[name]-bundle-' + hash + '.css',
      filename: 'css/[name].css',
      publicPath: '/',
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img/**/*'),
          to: 'img',
          flatten: true,
        },
      ],
    }),
  ],
};

// Multiple ect entries
glob.sync('./src/ect/**/[^_]*.ect').map((file) => {
  const filename = file.match(/src(\/ect\/|\/)([a-zA-Z0-9_/]*\/?[a-zA-Z0-9_]+)\.ect/i)[2];

  webpackConfig.plugins.unshift(
    new HTMLWebpackPlugin({
      filename: `${filename}.html`,
      template: file,
      publicPath: '/',
      inject: false,
      minify: false,
    }),
  );
});

module.exports = webpackConfig;
