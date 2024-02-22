import { post } from "./ajax";

// 提交答卷
export async function postAnswer(answerInfo:any) {
  const url = `/api/answer`;
  const res = await post(url, answerInfo);
  return res;
}