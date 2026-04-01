let count = 0;

export async function POST() {
  count++;
  console.log("Generate Meals Clicks:", count);

  return Response.json({ success: true, count });
}