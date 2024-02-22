import { get } from "./ajax";

export async function getQuestionById(id:string) {
  const url = `/api/question/${id}`;
  const resData = await get(url);
  return resData;
}