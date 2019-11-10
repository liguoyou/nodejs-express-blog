## 接口列表

### 所有错误

返回:
```
{
  errno: -1,
  message: '错误信息'
}
```

### 获取博客列表 `/api/blog/list`

请求: `get`

参数: 

|  参数   |  类型  | 必填  |  备注  |
| :-----: | :----: | :---: | :----: |
| author  | string |  否   |  作者  |
| keyword | string |  否   | 关键词 |

示例: 
```
/api/blog/list
```

返回:
```
{
    "data": [
        {
            "id": 4,
            "title": "博客标题B",
            "content": "博客内容B",
            "author": "guoyou",
            "createtime": 1572779934093,
            "state": 1
        },
        {
            "id": 3,
            "title": "博客标题A",
            "content": "博客内容A",
            "author": "guoyou",
            "createtime": 1572779880317,
            "state": 1
        }
    ],
    "errno": 0
}
```

### 获取博客详情 `/api/blog/detail?id=`

实例: 
```
/api/blog/detail?id=34
```

返回:
```
{
    "data": {
        "id": 3,
        "title": "博客标题A",
        "content": "博客内容A",
        "author": "guoyou",
        "createtime": 1572779880317,
        "state": 1
    },
    "errno": 0
}
```

### 新增博客 `/api/blog/new`

返回: 
```
{
    "data": {
        "id": 19
    },
    "errno": 0
}
```