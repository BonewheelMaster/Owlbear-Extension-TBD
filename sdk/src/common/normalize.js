export function normalizeUrl(url) {
    return url.startsWith("http") ? url : `${window.location.origin}${url}`;
}
/**
 * Normalize icon paths so that relative paths are transformed into absolute paths
 */
export function normalizeIconPaths(icons) {
    return icons.map((base) => ({
        ...base,
        icon: normalizeUrl(base.icon),
    }));
}
/**
 * Normalize an object with a url property so that relative paths are transformed into absolute paths
 */
export function normalizeUrlObject(urlObject) {
    return {
        ...urlObject,
        url: normalizeUrl(urlObject.url),
    };
}
