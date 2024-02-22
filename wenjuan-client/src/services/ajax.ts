const HOST = `http://localhost:3001`; 
export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`)
  const resData = res.json();
  return resData
}

export async function post(url:string, body:any) {
  const res = await fetch(`${HOST}${url}`, {
    method:"post",
    body: JSON.stringify(body)
  })
  const resData = res.json();
  return resData;
}