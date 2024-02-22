import React,{FC, useEffect, useState} from "react";
import styles from "./QuestionCheckBox.module.scss"
type PropsType = {
  fe_id: string,
  props: {
    title:string ,
    isVertical?:boolean,
    list: Array<{
      value: string,
      text: string,
      checked: boolean
    }>
  }
}
const QuestionCheckBox:FC<PropsType> = ({ fe_id, props}) => {
  const { title, list = [], isVertical } = props;
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);

  // 初始化时，判断默认选中
  useEffect(()=> {
    list.forEach(item => {
      const { value, checked} = item;
      if(checked) {
        setSelectedValues(selectedValues => selectedValues.concat(value))
      }
    })
  }, [list]);

  function toggleChecked(value:string) {
    // 删除
    if(selectedValues.includes(value)) {
      setSelectedValues(selectedValues => selectedValues.filter(v => v!==value))
    } else {
      setSelectedValues(selectedValues.concat(value))
    }
  }

  return <>
    <p>{title}</p>
    <input type="hidden" name={fe_id} value={selectedValues.toString()} />
    <ul className={styles.list}>
      {list.map(item => {
        const { value, text, checked} = item
        let liClass = isVertical ? styles.vertical : styles.horizontal
        return <li key={value} className={liClass}>
          <label>
            <input type="checkbox" checked={selectedValues.includes(value)} onChange={() => toggleChecked(value)} />
            {text}
          </label>
        </li>
      })}
    </ul>
  </>
}
export default QuestionCheckBox;