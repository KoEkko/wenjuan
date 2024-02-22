const Mock = require("mockjs");
const getQuestionList = require("./getQuestionList");
const getComponentList = require("./getComponentList")
const Random = Mock.Random;

module.exports = [
  { // 编辑问卷
    url:"/api/question/:id",
    method:"get",
    response() {
      return {
        errno:0,
        data:{
          id: Random.id(),
          title:Random.ctitle(),
          desc:"问卷描述",
          js:"",
          css:"",
          isPublished: true,
          isDeleted:false,
          // 组件列表
          componentList: getComponentList()
        },
      }
    }
  },
  { // 创建问卷
    url:"/api/question",
    method: "post",
    response() {
      return {
        errno:0,
        data: {
          id: Random.id()
        }
      }
    }
  },
  {
    // 获取问卷列表
    url:"/api/question",
    method:"get",
    response(ctx) {
      const { url = "", query = {} } = ctx;
      const isDeleted = url.indexOf("isDeleted=true") >= 0;
      const isStar = url.indexOf("isStar=true") >= 0 ;
      const pageSize = parseInt(query.pageSize) || 15;
      return {
        errno:0,
        data:{
          list: getQuestionList({ len: pageSize,isDeleted, isStar}), // 当前页
          total: 100  // 总数，用于分页
        }
      }
    }
  },
  {
    // 更新单个问卷
    url:"/api/question/:id",
    method:"patch",
    response() {
      return {
        errno:0
      }
    }
  },
  {
    //复制问卷
    url:"/api/question/duplicate/:id",
    method:"post",
    response() {
      return {
        errno:0,
        data:{
          id:Random.id()
        }
      }
    }
  },
  {
    url:"/api/question",
    method:"delete",
    response() {
      return {
        errno:0
      }
    }
  }
]