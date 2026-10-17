// Generic teaching illustrations generated for Resources; not customer-part evidence.
export const resourceIllustrations = {
 turning: {stem:'turning-geometry-v1',alt:'Generic stepped shaft illustrating rotational geometry'},
 milling: {stem:'milling-geometry-v1',alt:'Generic block with a pocket, flat faces and a hole pattern'},
 multiAxis: {stem:'multi-axis-geometry-v1',alt:'Generic component with a bore on an angled face and a hole on another face'},
 finish: {stem:'finish-interfaces-v1',alt:'Generic block with one exterior face highlighted red and a neutral bore to discuss treatment and protection'},
};
export function resourceIllustration(key:keyof typeof resourceIllustrations) {
 const {stem,alt}=resourceIllustrations[key];
 return `<img src="/media/resources/${stem}-800.webp" srcset="${[480,800,1200].map(w=>`/media/resources/${stem}-${w}.webp ${w}w`).join(', ')}" sizes="(max-width:760px) 200px, 300px" alt="${alt}" width="1200" height="900" loading="lazy" decoding="async"/>`;
}
