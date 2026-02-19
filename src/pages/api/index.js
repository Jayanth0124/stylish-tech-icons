import { fetchIconPaths } from '../../utils/icons';
import { generateStackSvg } from '../../components/Stack';

export default async function handler(req, res) {
  const { skills, theme = 'royal' } = req.query;

  if (!skills) {
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.status(400).send(`
      <svg width="850" height="200" viewBox="0 0 850 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="850" height="200" rx="12" fill="#0d0d0f" stroke="#ff4444"/>
        <text x="425" y="100" fill="#ff4444" text-anchor="middle" font-family="monospace">Error: Missing ?skills= parameter.</text>
        <text x="425" y="130" fill="#a1a1aa" text-anchor="middle" font-family="monospace">Example: ?skills=react,nodedotjs,python</text>
      </svg>
    `);
  }

  try {
    // Split the comma-separated list into an array
    const skillArray = skills.split(',').filter(Boolean);
    
    // Fetch the SVG paths from Simple Icons
    const iconPaths = await fetchIconPaths(skillArray);
    
    // Generate the masterpiece SVG
    const svg = generateStackSvg(skillArray, iconPaths, theme);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400'); // Cache for 24 hours
    
    return res.status(200).send(svg);
    
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}