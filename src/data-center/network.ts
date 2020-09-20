import axios, { AxiosResponse } from 'axios';

const axiosIns = axios.create();

interface IRunSQLRes {
  /**
   * SQL执行成功返回true，反正false。
   */
  status: boolean;
  /**
   * SQL执行的反馈信息。
   * 
   * e.g.
   * 查询语句执行之后，可返回message为 "10000 rows returned."
   */
  message: string;
  /**
   * 执行本次SQL语句所用时间。
   * 
   * e.g.
   * "0.34s"
   */
  totalTime: string;
  /**
   * 执行本次SQL语句的时间。
   * 
   * e.g.
   * "16:49"
   */
  time: string;
  /**
   * 执行本次SQL语句后当前数据库的名字。
   */
  curDatabase: string;

  /**
   * 执行本次SQL语句查询到的数据列。如果不是查询语句，则返回空数组[]。
   * 
   * e.g.
   * ['id', 'name', 'age']
   */
  columns: string[];
  /**
   * 执行本次SQL语句查询到的数据。如果不是查询语句或查询结果为空，则返回空数组[]。
   * 
   * e.g.
   * [
   *   { id: 1, name: 'zhang', age: 20 },
   *   { id: 2, name: 'asfdasdf', age: 23 },
   *   { id: 3, name: 'ljk', age: 20 },
   * ]
   */
  data: any[];
}

export const runSQL = (sql: string) => {
  return axiosIns.post<any, AxiosResponse<IRunSQLRes>>('/api/runsql', sql);
  // return new Promise<IRunSQLRes>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: true,
  //       message: '100000 rows returned.',
  //       totalTime: '0.53s',
  //       time: '16:34',
  //       curDatabase: 'student',
  //       columns: ['id', 'name', 'age', 'home', 'phone'],
  //       data: Array.from({length: 1000000}, (_, item) => ({
  //         key: item,
  //         id: item,
  //         name: '' + item + item + item,
  //         age: item * 2,
  //         home: '' + item + item + item,
  //         phone: '' + item + item + item
  //       }))
  //     })
  //   }, 500);
  // });
};

interface ICurDatabaseRes {
  /**
   * 如果至少存在一个数据库，则返回true，反之返回false。
   */
  status: boolean;
  /**
   * 如果至少存在一个数据库，则返回第一个找到的数据库的名字，反之返回空字符串。
   */
  res: string;
}

export const getCurDatabase = () => {
  return axiosIns.get<any, AxiosResponse<ICurDatabaseRes>>('/api/curdb');
  // return new Promise<ICurDatabaseRes>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       status: true,
  //       res: '(Please use a database!)'
  //     })
  //   }, 100);
  // });
}