  function extractPathFromURL(url: string) {
    // Remove starting URL
    var path = url.replace("https://fal-cdn.batuhan-941.workers.dev/", "");
    // Remove .jpeg extension
    path = path.replace(".jpeg", "");
    return path;
  }
