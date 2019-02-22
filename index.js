#! /usr/bin/env node

'use strict'

const xlsx = require('node-xlsx')
const fs=require('fs');   //fs是node.js的核心模块，不用下载安装，可以直接引入

//打印日志
function printLog(str){
	console.log('error:'+str);
}
//打印异常提示
function printError(str){
	console.log('error:'+str);
}

//遍历数组中是否有非真元素
function isNoneInArr(items){
	for(var i=0;i<items.length;i++){
		if(!items[i])return true;
	}
	return false;
}

//遍历所有元素都符合变量名规范



//检测excel数据格式是否有异常
function isExcelError(sheet){
	if(!sheet){
		printError('sheet数据异常！')
		return true;
	}

	var itemList=sheet.data;//数据项
    var keys=itemList[0];//第一行：字段名
    var dtypes=itemList[1];//第二行：数据类型
	if(isNoneInArr(keys)){
		printError('字段名必须为非空字符串');
		return true;
	}
	return false;
}


//取得数值
function getValueByType(value,dtype){
	if(dtype==='str'){
		if(value===undefined){
			value='';
		}
		return '"'+value+'"'
	}
	if(value===undefined){
		value=0;
	}
	return value;
}

//字符串写入文件保存
function writeStrToFile(file,str){
	fs.writeFile(file,str,'utf8',function(error){
	    if(error){
	        console.log(error);
	        return false;
	    }
	    console.log('写入'+file+'成功');
	})
}

function sheetToDict(sheet){
	var name=sheet.name;//文件名
	var itemList=sheet.data;//数据项
    var keys=itemList[0];//第一行：字段名
    var dtypes=itemList[1];//第二行：数据类型
    
    //检测数据格式是否异常
    if(isExcelError(sheet)){
    	console.log('数据异常');
    	return;
    }

    var item;//数值项
    var target='var '+name+'=[\n';//目标字符串输出

	for(var i=2;i<itemList.length;i++){
		item=itemList[i];
		if(item.length<=0){
			printError('跳过数据项：'+i);
			break;
		}
		if(!item[0]){
			printError('跳过数据项：'+i);
			break;
		}

		target+='  {\n';
		for(var j=0;j<keys.length;j++){
			target+='    '+keys[j]+':'+getValueByType(item[j],dtypes[j]);
			target+=(j>=keys.length-1)?'':',';
			target+='\n';
		}
		target+='  },\n';
	}
	target+='];';

	console.log('-----------------')
	console.log(name+'字典数据：'+target);
	//保存字典数据
	writeStrToFile(name+'.js',target);
}

function excelToDict(){
	var excelObj=xlsx.parse('dict_data.xlsx');
	console.log('读取到excel数据:'+JSON.stringify(excelObj));
	for (var i in excelObj) {
		sheetToDict(excelObj[i]);
	}
}

//批量处理当前目录下的excel 文件
excelToDict();