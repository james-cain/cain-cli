# cain-cli
#### 该工具实现对gitlab和github模板项目的统一下载并创建新项目

使用步骤很简单

首先本地环境要有nodejs的环境，并配置npm intall -g全局安装的目录位置

到node官网中[下载](https://nodejs.org/en/)，路径可以自己指定，安装完成后，在命令行窗口中执行命令

```
node -v

npm -v
```

有出现版本号即安装成功

接着安装该项目到本地

```
npm install cain-cli -g
```

当运行cain出现help信息，即安装成功！

接下来介绍命令列表

cain 后可带命令参数

- init <template-name> [project-name]根据模版生成一个新工程
- add 增加一个新模版配置信息，提供查阅
- list 提供查询已经有的模版信息
- delete 删除模版信息
- help 查看命令信息

其中 init 命令后带参数

- <template-name> 模板名，格式为owner/name，若安装的是我的目录的模板，可以直接输入name
- [project-name] 工程项目名，保存在当前的目录内，若不填该参数，则在当前目录之间创建模版内容，建议必填
- -c or --clone 代表克隆的仓库来自gitlab，内置的gitlab仓库写死gitlab仓库地址，不填下载的为github仓库模版
- -h or --help 查看cain init 命令信息

目前模板已经有

[cain-template-webpack-vue/PC端后台模板一/](https://github.com/james-cain/cain-template-webpack-vue)

[cain-design-pro/PC端后台模板二/](https://github.com/james-cain/cain-design-pro)

长远考虑，可以提供更多的开发模板使用，也可以继续完善该脚本功能。

The end~