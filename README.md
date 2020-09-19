# minidb-ui

## 运行

```bash
npm install
npm start
```

## 网络接口

1. 运行SQL语句

   `POST: /api/runsql`

   附带data为字符串，即所要运行的SQL语句。

   期望返回结果为json格式，字段如下：

   | 字段        | 类型     | 说明                                                         |
   | ----------- | -------- | ------------------------------------------------------------ |
   | status      | boolean  | SQL执行成功返回true，反正false。                             |
   | message     | string   | SQL执行的反馈信息。<br/><br/>e.g.<br/>查询语句执行之后，可返回message为"10000 rows returned." |
   | totalTime   | string   | 执行本次SQL语句所用时间。<br><br>e.g.<br>"0.34s"             |
   | time        | string   | 执行本次SQL语句的时间点。<br/><br/>e.g.<br/>"16:49"          |
   | curDatabase | string   | 执行本次SQL语句后当前数据库的名字。                          |
   | columns     | string[] | 执行本次SQL语句查询到的数据列。如果不是查询语句，则返回空数组[]。<br/> <br/>e.g.<br/>['id', 'name', 'age'] |
   | data        | any[]    | 执行本次SQL语句查询到的数据。如果不是查询语句或查询结果为空，则返回空数组[]。<br/><br/>e.g.<br/>[<br/>  { id: 1, name: 'zhang', age: 20 },<br/>  { id: 2, name: 'asfdasdf', age: 23 },<br/>  { id: 3, name: 'ljk', age: 20 },<br/>] |

2. 获取当前数据库名字

   `GET: /api/curdb`

   无参数。

   期望返回结果为json格式，字段如下：

   | 字段   | 类型    | 说明                                                         |
   | ------ | ------- | ------------------------------------------------------------ |
   | status | boolean | 如果至少存在一个数据库，则返回true，反之返回false。          |
   | res    | string  | 如果至少存在一个数据库，则返回当前所在数据库名字。<br>若当前没有指定的数据库或status为false，则返回"(Please use a database!)"。 |

   注：SQL语句运行并不需要指定数据库名字，因为始终有一个默认选定的数据库上下文。该接口的目的就是获取该上下文的名字，显示在界面最上方。