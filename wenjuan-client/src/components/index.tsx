import QuestionCheckBox from "./QuestionComponents/QuestionCheckbox";
import QuestionInfo from "./QuestionComponents/QuestionInfo";
import QuestionInput from "./QuestionComponents/QuestionInput";
import QuestionParagraph from "./QuestionComponents/QuestionParagraph";
import QuestionRadio from "./QuestionComponents/QuestionRadio";
import QuestionTextArea from "./QuestionComponents/QuestionTextArea";
import QuestionTitle from "./QuestionComponents/QuestionTitle";

type ComponentInfoType = {
  fe_id: string,
  type: string,
  isHidden: boolean,
  props: any
}
export const getComponent = (comp: ComponentInfoType) => {
  const { fe_id, type, isHidden, props = {} } = comp;
  if(isHidden) return null;
  if(type === "questionInput") {
    return <QuestionInput fe_id={fe_id} props={props} />
  }
  if(type === "questionRadio") {
    return <QuestionRadio fe_id={fe_id} props={props}  />
  }
  if(type === "questionTitle") {
    return <QuestionTitle {...props} />
  }
  if(type === "questionParagraph") {
    return <QuestionParagraph {...props} />
  }
  if(type === "questionInfo") {
    return <QuestionInfo {...props} /> 
  }
  if(type === "questionTextarea") {
    return <QuestionTextArea fe_id={fe_id} props={props} />
  }
  if(type === "questionCheckBox") {
    return <QuestionCheckBox fe_id={fe_id} props={props} />
  }
  return null;
}