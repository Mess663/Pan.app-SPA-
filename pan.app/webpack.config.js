module.exports = {
    
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                module: true
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        },
        {
          test:/\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,  
          use: [  
                   {   
                      loader: 'url-loader?limit=8192&name=public'
                   }  
          ]  
        },
        // {
        //   // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
        //   // 如下配置，将小于8192byte的图片转成base64码
        //   test: /\.(png|jpg|gif)$/,
        //   loader: 'url-loader?limit=8192&name=./imgs/[hash].[ext]',
        // },
        {
          test: /\.scss$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings 
          }, {
              loader: "css-loader" // translates CSS into CommonJS 
          }, {
              loader: "sass-loader" // compiles Sass to CSS 
          }]
        }
        
    ]
    

    }
  

  }
  