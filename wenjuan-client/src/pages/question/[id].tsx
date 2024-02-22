import React, {FC} from "react";
import styles from "@/styles/Question.module.scss";
import QuestionInput from "../../components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";
import PageWrapper from "@/components/PageWrapper"
import { getQuestionById } from "@/services/question";
import { getComponent } from "@/components";

type PropsType = {
  errno: number,
  data:{
    id: string
    title: string,
    desc?: string,
    js?: string,
    css?: string,
    isPublished?: boolean,
    isDeleted?: boolean,
    componentList: Array<any>
  }
  msg?: string
}
const Question:FC<PropsType> = (props: PropsType) => {
  const { errno, data, msg = ""} = props
  // 数据错误
  if(errno !== 0 ) {
    return <PageWrapper title="错误">
      <h1>错误</h1>
      <p>{msg}</p>
    </PageWrapper>
  }
  const { id, title, isDeleted, isPublished, desc = "", componentList = []} = data || {};
  // 已经被删除，提示错误
  if(isDeleted) {
    return <PageWrapper title={title} desc={desc}>
      <h1>{title}</h1>
      <p>该问卷已经被删除</p>
    </PageWrapper>
  }
  // 还没发布
  if(!isPublished) {
    return <PageWrapper title={title} desc={desc}>
    <h1>{title}</h1>
    <p>该问卷尚未发布</p>
  </PageWrapper>
  }
  const ComponentListElem = <>
    {componentList.map(c => {
      const ComponentElem = getComponent(c);
      return <div key={c.fe_id} className={styles.componentWrapper}>
        {ComponentElem}
      </div>
    })}
  </>
  return <PageWrapper title={title}>
    <form method="post" action="/api/answer">
        <input type="hidden" value={id} name="questionId" />
        {ComponentListElem}
        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
    </form>
  </PageWrapper>
}
export default Question;


export async function getServerSideProps(context:any) {
  const { id} = context.params;
  // 根据id获取问卷数据
  const data = await getQuestionById(id);
  return {
    props:data
  }
  
}