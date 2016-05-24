Node.js项目实战

### 一、搭建项目框架

- 初始化git项目
  - `git clone xxx`
  - `npm init`
  - `git add` 
  - `git commit -m`
  - `git push`
  - `.gitignore  //设置不需要加入git的文件或文件夹`
  - 编辑package.json，加入
    ```json
      "repository": {
        "type": "git",
        "url": "git+https://github.com/honggzb/practise_node.git"
      },
    ```
- Babel编译设置，参见[早起搬砖](morning.work)
  - `.babelrc`文件
  - `npm install babel-cli babel-preset-es2015-node4 babel-preset-stage-0 --save-dev`
  - 编译, `babel src -d target --watch`  // watch实时监视
- 根据NODE_ENV加载配置文件，编辑package.json，加入
  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "npm run clean && babel src -d target --watch",
    "compile": "npm run clean && babel src -d target",
    "clean": "rm -Rf target",
    "dev": "export NODE_ENV=dev && export DEBUG='my:*,project-core:*' && node target/server.js"
  },
  ```

- 注册路由
- 输出debug信息

### 二、