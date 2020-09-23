import { Ace } from 'ace-builds';
import axios, { AxiosResponse } from 'axios';

const axiosIns = axios.create();
const isMock = true;

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
  /**
   * 本次SQL语句的语法错误出现位置。如果没有语法错误，则为null。
   */
  error: Required<Ace.Annotation> | null;
}

export const runSQL = (sql: string) => {
  if(!isMock) {
    return axiosIns.post<any, AxiosResponse<IRunSQLRes>>('/api/runsql', {
      command: sql
    });
  }
  
  return new Promise<{ data: IRunSQLRes }>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          status: true,
          message: '3000000 rows returned.',
          totalTime: '0.53s',
          time: '16:34',
          curDatabase: 'student',
          columns: ['id', 'name', 'age', 'home', 'phone', 'phone1', 'phone2', 'phone3', 'phone4', 'phone5'],
          data: Array.from({length: 300000}, (_, item) => ({
            key: item,
            id: item,
            name: '' + item + item + item,
            age: item * 2,
            home: '' + item + item + item,
            phone: '' + item + item + item,
            phone1: '' + item + item + item,
            phone2: '' + item + item + item,
            phone3: '' + item + item + item,
            phone4: '' + item + item + item,
            phone5: '' + item + item + item,
          })),
          error: {
            row: 1,
            column: 2,
            text: 'error in asdf',
            type: "error"
          }
        }
      })
    }, 0);
  });
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
  if(!isMock) {
    return axiosIns.get<any, AxiosResponse<ICurDatabaseRes>>('/api/curdb');
  }
  
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          status: true,
          res: '(Please use a database!)'
        }
      })
    }, 100);
  });
}