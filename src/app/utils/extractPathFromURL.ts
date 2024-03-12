export function extractPathFromURL(url: string) {
  // Remove starting URL
  var path = url.replace("https://fal-cdn.batuhan-941.workers.dev/", "");
  // Remove .jpeg extension
  path = path.replace(".jpeg", "");
  // Replace slashes with hyphens
  path = path.replace(/\//g, "-");
  
  return path;
}
