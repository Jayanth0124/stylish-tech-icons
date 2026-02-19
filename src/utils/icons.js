export async function fetchIconPaths(skills) {
  const paths = {};
  
  // Fetch all icons simultaneously for maximum speed
  await Promise.all(skills.map(async (skill) => {
    try {
      const slug = skill.trim().toLowerCase();
      const res = await fetch(`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${slug}.svg`);
      
      if (res.ok) {
        const svgText = await res.text();
        // Extract the raw SVG drawing path
        const match = svgText.match(/d="([^"]+)"/);
        if (match) {
          paths[slug] = match[1];
        }
      }
    } catch (error) {
      console.error(`Failed to fetch icon: ${skill}`);
    }
  }));

  return paths;
}