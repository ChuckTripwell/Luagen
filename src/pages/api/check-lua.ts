import type { APIRoute } from 'astro';

const API_BASE = "https://api.luagen.revobd.club";
const GITHUB_BASE = "https://codeload.github.com/SteamAutoCracks/ManifestHub/zip/refs/heads";
const KERNELOS_API = "https://kernelos.org/games/download.php";

export const GET: APIRoute = async ({ url }) => {
  const gameId = url.searchParams.get('id');

  if (!gameId) {
    return new Response(JSON.stringify({ error: 'Game ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!/^\d+$/.test(gameId)) {
    return new Response(JSON.stringify({ error: 'Invalid Game ID format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const primaryUrl = `${API_BASE}/${gameId}.zip`;
    const githubUrl = `${GITHUB_BASE}/${gameId}`;

    console.log(`Checking game ID: ${gameId}`);
    console.log(`Priority 1 - API URL: ${primaryUrl}`);

    // Check API first (Priority 1)
    try {
      const apiRes = await fetch(primaryUrl, { 
        method: 'HEAD',
        redirect: 'follow',
        headers: {
          'User-Agent': 'LuaGen/1.0'
        }
      });
      
      console.log(`API Response - Status: ${apiRes.status}, OK: ${apiRes.ok}`);
      
      // Check if response is successful
      if (apiRes.ok) {
        console.log('✓ Found on API server');
        return new Response(JSON.stringify({
          success: true,
          primary: primaryUrl,
          github: githubUrl,
          kernelos: null,
          source: 'api'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      console.log('✗ Not found on API server, trying GitHub...');
    } catch (e) {
      console.error('API check error:', e);
      // API failed, continue to GitHub
    }

    console.log(`Priority 2 - GitHub URL: ${githubUrl}`);

    // Check GitHub backup (Priority 2)
    try {
      const ghRes = await fetch(githubUrl, { 
        method: 'HEAD',
        redirect: 'follow'
      });
      
      console.log(`GitHub Response - Status: ${ghRes.status}, OK: ${ghRes.ok}`);
      
      if (ghRes.ok) {
        console.log('✓ Found on GitHub server');
        return new Response(JSON.stringify({
          success: true,
          primary: githubUrl,
          github: githubUrl,
          kernelos: null,
          source: 'github'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      console.log('✗ Not found on GitHub, trying KernelOS...');
    } catch (e) {
      console.error('GitHub check error:', e);
      // GitHub failed, continue to KernelOS
    }

    // Try KernelOS backup (Priority 3)
    try {
      const kernelosRes = await fetch(`${KERNELOS_API}?gen=depotool&id=${gameId}`);
      if (kernelosRes.ok) {
        const data = await kernelosRes.json();
        if (data?.url) {
          const kernelosUrl = `https://kernelos.org${data.url}`;
          return new Response(JSON.stringify({
            success: true,
            primary: kernelosUrl,
            github: githubUrl,
            kernelos: kernelosUrl,
            source: 'kernelos'
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    } catch (e) {
      console.error('KernelOS check failed:', e);
      // KernelOS failed
    }

    // All sources failed
    return new Response(JSON.stringify({
      success: false,
      error: 'No Lua archive found for this Game ID across all servers.'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Unable to reach servers. Check your connection and try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
