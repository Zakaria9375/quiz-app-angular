import {UrlSegment} from "@angular/router";

export function skillMatcher(segments: UrlSegment[]) {
  const allowedSlugs = ['html', 'css', 'js', 'accessibility']
  if (segments.length === 2 && segments[0].path === 'skill') {
    const slug = segments[1].path;

    // Check if the second segment (slug) is in the allowed slugs
    if (allowedSlugs.includes(slug)) {
      return {
        consumed: segments,
        posParams: {
          slug: new UrlSegment(slug, {})
        }
      };
    }
  }

  return null;
}
