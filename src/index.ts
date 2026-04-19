import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const request_id = url.searchParams.get("request_id");
    if (!request_id) throw new Error("Missing request_id");

    const FAL_KEY = Deno.env.get("FAL_KEY");
    if (!FAL_KEY) throw new Error("FAL_KEY not set");

    const statusRes = await fetch(
      `https://queue.fal.run/fal-ai/kling-video/v1.6/standard/text-to-video/requests/${request_id}/status`,
      { headers: { "Authorization": `Key ${FAL_KEY}` } }
    );

    const statusData = await statusRes.json();

    if (statusData.status === "COMPLETED") {
      const resultRes = await fetch(
        `https://queue.fal.run/fal-ai/kling-video/v1.6/standard/text-to-video/requests/${request_id}`,
        { headers: { "Authorization": `Key ${FAL_KEY}` } }
      );
      const resultData = await resultRes.json();
      const video_url = resultData?.video?.url || null;

      return new Response(JSON.stringify({ status: "COMPLETED", video_url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: statusData.status }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
