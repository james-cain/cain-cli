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

配置全局npm的路径

在安装的node的目录内，创建node_global和node_cache两个文件夹，在命令行窗口执行

```
npm config set cache "node安装路径\node_cache"
npm config set prefix "node安装路径\node_global"
```

然后运行(2)

```
npm install vue-cli -g
```

如果在node_global目录下没有vue-cli文件夹，则在nodejs安装目录中找到node_modules\npm\ .npmrc文件，修改如下代码：

```
prefix = node安装路径\node_global
cache = node安装路径\node_cache
```

接着运行(2)查看，若有，则配置成功。

接着安装该项目到本地

```
git clone https://github.com/james-cain/cain-cli
cd cain-cli && npm install
or 
cd cain-cli && yarn
npm link
```

##### [注]

经过本人测试，在windows环境中，npm link后在全局并不能直接使用cain命令，若开发人员安装时也发现类似问题，拷贝以下文件到C:\dev\nodejs\eim和 C:\dev\nodejs\cain.cmd中（这两个文件为本人本地的nodejs安装目录，对应到相应的文件目录即可）

```
// cain
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/node_modules/cain-cli/bin/cain" "$@"
  ret=$?
else 
  node  "$basedir/node_modules/cain-cli/bin/cain" "$@"
  ret=$?
fi
exit $ret

// cain.cmd
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\cain-cli\bin\cain" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\cain-cli\bin\cain" %*
)
```

mac没有测试过，若不行，也是相同的问题引起的！

当运行cain出现help信息，即安装成功！

接下来介绍命令列表

cain 后可带命令参数

- init <template-name> [project-name]根据模版生成一个新工程
- add 增加一个新模版配置信息，提供查阅
- list 提供查询已经有的模版信息
- delete 删除模版信息
- help 查看命令信息

其中 init 命令后带参数

- <template-name> 模板名，格式为owner/name
- [project-name] 工程项目名，保存在当前的目录内，若不填该参数，则在当前目录之间创建模版内容，建议必填
- -c or --clone 代表克隆的仓库来自gitlab，内置的gitlab仓库写死gitlab仓库地址，不填下载的为github仓库模版
- -h or --help 查看cain init 命令信息

目前模板已经有

[cain-template-webpack-vue/PC端后台开发模板/](https://github.com/james-cain/cain-template-webpack-vue)

长远考虑，可以提供更多的开发模板使用，也可以继续完善该脚本功能。

The end~