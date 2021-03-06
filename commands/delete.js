#!/usr/bin/env node
let { prompt } = require('inquirer')
let { writeFile } = require('fs')
let { listTable } = require('../utils')

let tplList = require('../templist')

const question = [
  {
    type: "input",
    name: 'name',
    message: '要删除的模板名：',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return '模板名必填！'
      } else {
        return '模板名不存在！'
      }
    }
  }
]

listTable(tplList, '')

prompt(question).then(({ name }) => {
  delete tplList[name]
  
  writeFile(`${__dirname}/../templist.json`, JSON.stringify(tplList, null, 2), 'utf-8', err => {
    if (err) {
      console.log(err)
    }
    console.log('模板已经删除成功！')
    listTable(tplList, '模板已经删除成功！')
    // process.exit()
  })
})