export const breakpoints = {
    xs: 315,
    sm: 414,
    md: 768,
    lg: 992,
    xl: 1280,
};

export const mediaQueries = (key) => {
    return (style) => `@media (min-width: ${breakpoints[key]}px) { ${style} }`;
};
