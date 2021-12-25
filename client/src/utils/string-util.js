export const Capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

export const Shorten = (text) => {
    if(text.length > 50) {
        return text.substring(0, 50) + '...';
    }
    return text;
}
