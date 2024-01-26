export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") as null | string

  if (query == null) {
    return Response.json({ status: 401, error: "Invalid query"})
  }

  console.log("Query: %s", query)

  const req = `https://ac.cnstrc.com/autocomplete/${query}?c=ciojs-client-2.35.2&key=key_XT7bjdbvjgECO5d8&i=96be5338-b4f9-4788-a20c-881d2d870d52&s=2&num_results_Products=25&num_results_Collections=20&_dt=1705870851157`
  const res = await fetch(req)
  const data = await res.json()

  const results = []

  for (const result of data.sections.Products) {
    results.push({
      name: result.value,
      imageUrl: result.data.image_url,
      id: result.data.id
    })
  }

  console.log(results)

  return Response.json(results)
}