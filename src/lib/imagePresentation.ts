/** Public captions describe useful content; media provenance stays in the registries. */
export function editorialPhotoCaption(caption?: string): string | undefined {
 if (!caption || /\b(?:ImageGen|illustration|original company photograph|original source|source photograph|real source detail)\b/i.test(caption)) return undefined;
 const text = caption.replace(/\s*[·—]\s*original (?:LZZ )?photograph\.?$/i, '').trim();
 return /^(?:Original (?:LZZ )?(?:photo|photograph)|Part form and visible features\.?|Original workshop reference\.?)$/i.test(text) ? undefined : text || undefined;
}

export function imageDescription(alt: string): string {
 return alt.replace(/^ImageGen[- ](?:refined reference|photographic illustration):\s*/i, '')
  .replace(/\s*[—·]\s*ImageGen (?:photographic illustration|refined reference)\.?$/i, '');
}
