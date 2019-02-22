一个处理excel字典数据的命令行工具；
---------------

##用法：

1. npm -i exceltodict -g;//全局安装插件
2. cd excels; //cd到目标文件夹(文件夹中放置dict_data.xlsx数据文件,支持单个excel文件创建多个sheet表批量导出);
3. 运行exd 命令;

导出的js字典数据会存储在当前目录下

##说明：

1. excel字典表第1行为字段名，不可使用非真字符串
2. excel字典表第2行为数据类型，目前两种str （字符串类型：导出时会添加""） other (其他数据类型：导出不加引号)
3. str类型字典数据漏填时会默认导出"";其他类型漏填时导出0;
4. excel字典表第2行数据类型漏填时默认为other;

##数据表示例：

id|name|age|desc
--|:--:|--:|--:
other|str|other|str
1|小红|13|学习委员
2|小明|12|班长
3|小李|15|劳动委员

##目录结构

```
--excel--数据源实例
------dict_data.xlsx
------dict_questions.js
------dict_users.js
--lib--------模块代码
--test-------单元测试
--index.js---工程入口
```

##版本记录

v1.0.0  2019.02.21  发布架包；

v1.0.1  2019.02.22  发布第一个可用版本；

v1.0.2  2019.02.22  去掉package.json中的excel引入，更新README.md；

v1.0.3  2019.02.22  package.json中添加关键字，更新README.md；

v1.0.4  2019.02.22  更新README.md；
