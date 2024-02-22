const Mock = require("mockjs");

const Random = Mock.Random;
function getComponentList() {
  return [
    //Info
    {
      // 由于 统计页面 左侧和中间位置组件需要联动，组件的ID要统一， 所以写死
      fe_id: "C1",
      title:"问卷信息",
      type:"questionInfo",
      isHidden:false,
      isLocked:false,
      props:{
        title:"问卷标题",
        desc:"问卷描述"
      }
    },
    // Title
    {
      fe_id: "C2",
      type: "questionTitle", // 组件类型，不能重复，前后端统一好
      title:"标题", // 左边面板图层中显示的内容
      isHidden: false,
      isLocked: false,
      props:{
        text: "个人信息调研",
        level: 1,
        isCenter: false
      }
    },
    // Input
    {
      fe_id: "C3",
      type: "questionInput", 
      title:"输入框1",
      isLocked: false,
      isHidden: false,
      props:{
        title: "你的姓名",
        placeholder: "请输入姓名..."
      },
    },
    // paragraph
    {
      fe_id:"C5",
      title:"段落",
      type:"questionParagraph",
      isHidden:false,
      isLocked:false,
      props:{
        text:"一行段落",
        isCenter: false
      }
    },
    // textarea
    {
      fe_id: "C6",
      title:"多行输入",
      type:"questionTextarea",
      isHidden:false,
      isLocked:false,
      props:{
        title:"你的爱好",
        placeholder: "请输入你的爱好"
      }
    },
    // radio
    {
      fe_id:"C7",
      title:"单选",
      type:"questionRadio",
      isHidden: false,
      isLocked: false,
      props:{
        title: "单选标题",
        options: [
          { value: "item1", text: "选项1" },
          { value: "item2", text: "选项2" },
          { value: "item3", text: "选项3" },
        ],
        isVertical: false,
        value: "",
      }
    },
    // checkbox
    {
      fe_id:"C8",
      title:"多选",
      type:"questionCheckBox",
      isHidden: false,
      isLocked: false,
      props:{
        title: "多选标题",
        list: [
          { value: "item1", text: "选项1", checked:false },
          { value: "item2", text: "选项2", checked:false },
          { value: "item3", text: "选项3" , checked:false},
        ],
        isVertical: false,
      }
    }
  ]
}

module.exports = getComponentList