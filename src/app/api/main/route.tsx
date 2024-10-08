export async function GET() {
  const res = await fetch("https://test-acg-playground.insahr.co.kr/users/meals", {});
  const users = await res.json();
  console.log("🚀 ~ GET ~ users:", users);
  return Response.json(users);
}
