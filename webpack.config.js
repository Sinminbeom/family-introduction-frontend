const path = require('path')                                        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성, 우리는 그냥 시작만 하고싶지 귀찮게 index.html 파일까지 만들고 싶지 않다.!!

module.exports = {                                      // moduel export (옛날 방식..)
    entry: './src/index.js',                            // 리액트 파일이 시작하는 곳
    output: {                                           // bundled compiled 파일
        path: path.join(__dirname, '/dist'),            //__dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
        filename: 'index_bundle.js'
    },
    module: {                                           // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
        rules: [
            {
                test: /\.(mjs|js|jsx)$/,                // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
                exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,                 // node module 폴더는 babel 컴파일에서 제외
                use:{
                    loader: 'babel-loader',				// babel loader가 파이프를 통해 js 코드를 불러옴
                },

            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, 
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
                                modifyVars: {
                                    '@primary-color': '#1DA57A',
                                    // '@primary-color': '#e920d8',
                                    // '@link-color': '#1DA57A',
                                    // '@border-radius-base': '2px',
                                },
                                javascriptEnabled: true,
                            },
                            
                        },
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            'window.Quill': 'quill/dist/quill.js',
            template: './src/index.html',                // 생성한 템플릿 파일
            templateParameters: { // 템플릿에 주입할 변수들 지정
                env: process.env.NODE_ENV === 'development' ? '(개발중)' : ''
            }
        })
        
        
    ]



}