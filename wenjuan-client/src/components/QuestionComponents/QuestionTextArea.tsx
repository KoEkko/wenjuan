import React, {FC} from "react";
import styles from "./QuestionTextArea.module.scss"

type PropsType = {
  fe_id: string,
  props: {
    title: string,
    placeholder?: string
  }
}

const QuestionTextArea: FC<PropsType> = ({ fe_id, props}) => {
  const { title, placeholder } = props;
  return <>
    <p> {title} </p>
    <div className={styles.textAreaWrapper}>
        <textarea name={fe_id} rows={5} placeholder={placeholder}  />
    </div>
  </>
} 
export default QuestionTextArea