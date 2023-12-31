export async function getTrends() {
  const res = await fetch(`http://localhost:9091/api/trends`, {
    next: {
      tags: ["trends"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
