const path = require("path");

module.exports = {
  entry: {
    main: "./src/main.tsx",
    content_script: "./src/content_script.ts",
    background: "./src/background.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  // stats: 'summary',
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-react", { runtime: "automatic" }],
              [
                "@babel/preset-typescript",
                {
                  isTSX: true,
                  allExtensions: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
