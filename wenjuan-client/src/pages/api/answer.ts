import { postAnswer } from "@/services/answer";
import type { NextApiRequest, NextApiResponse } from "next";

function genAnswerInfo(reqBody: any) {
  const answerList: any[] = [];
  Object.keys(reqBody).forEach(key => {
    if(key === "questionId") return 
    answerList.push({
      componentId: key,
      value: reqBody[key]
    })
  }) 
  return {
    questionId: reqBody.questionId || "",
    answerList
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method !== "POST") {
    res.status(200).json({ errno: -1, msg: "Method 错误"})
  }
  // 获取并格式化表单数据
  const answerInfo = genAnswerInfo(req.body);

  try {
    const resData = await postAnswer(answerInfo);
    if(resData.errno === 0) {
      // 提交成功
      res.redirect("/success")
    }
  } catch(err) {
    res.redirect("/fail")
  }

  res.status(200).json({ errno: 0})
}
