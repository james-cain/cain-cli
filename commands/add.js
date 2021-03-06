#!/usr/bin/env node
let { prompt } = require('inquirer')
let { writeFile } = require('fs')
let { listTable } = require('../utils')

let tplList = require('../templist')

const question = [
  {
    type: 'input',
    name: 'name',
    message: '设置模板名：',
    validate (val) {
      if (tplList[val]) {
        return '模板已经存在'
      } else if (val === '') {
        return '模板名不能为空'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '模板的 Owner/name：',
    validate (val) {
      if (val !== '') {
        return true
      } else {
        return '没有设置仓库位置'
      }
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: '模板的分支：',
    default: 'master'
  }
]

prompt(question).then(({name, place, branch}) => {
  tplList[name] = {}
  tplList[name]['owner/name'] = place
  tplList[name]['branch'] = branch

  writeFile(`${__dirname}/../templist.json`, JSON.stringify(tplList, null, 2), 'utf-8', err => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, '新的模板名和仓库位置已经创建成功！')
    process.exit()
  })
})
