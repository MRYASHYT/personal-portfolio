interface Env {
  PORTFOLIO_DB: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const key = "portfolio_data";

  if (request.method === "GET") {
    const data = await env.PORTFOLIO_DB.get(key);
    if (!data) {
      return new Response(JSON.stringify({}), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (request.method === "POST") {
    // Basic auth check using the environment variable
    const authHeader = request.headers.get("Authorization");
    const adminPassword = (env as any).VITE_ADMIN_PASSWORD;

    if (!authHeader || authHeader !== adminPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const payload = await request.json();
      await env.PORTFOLIO_DB.put(key, JSON.stringify(payload));
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};
