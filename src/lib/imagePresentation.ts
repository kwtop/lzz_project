/** Public captions describe useful content; media provenance stays in the registries. */
const generationLabel = /\b(?:ImageGen|AI[- ](?:generated|refined|edited|enhanced)|(?:generated|refined|edited|enhanced) (?:by|with|using) AI)\b|AI\s*生成|人工智能生成/i;

export function editorialPhotoCaption(caption?: string): string | undefined {
 if (!caption || generationLabel.test(caption) || /\b(?:illustration|original company photograph|original source|source photograph|real source detail)\b/i.test(caption)) return undefined;
 const text = caption.replace(/\s*[·—]\s*original (?:LZZ )?photograph\.?$/i, '').trim();
 return /^(?:Original (?:LZZ )?(?:photo|photograph)|Part form and visible features\.?|Original workshop reference\.?)$/i.test(text) ? undefined : text || undefined;
}

export function imageDescription(alt: string): string {
 return alt.replace(/^(?:ImageGen[- ](?:refined reference|photographic illustration)|AI[- ](?:generated|refined|edited|enhanced)(?: (?:image|photograph|photo|illustration))?):\s*/i, '')
  .replace(/^AI[- ](?:generated|refined|edited|enhanced) (?:image|photograph|photo|illustration) of\s+/i, '')
  .replace(/\s*[—·|]\s*(?:ImageGen (?:photographic illustration|refined reference)|AI[- ](?:generated|refined|edited|enhanced)(?: (?:image|photograph|photo|illustration))?|(?:generated|refined|edited|enhanced) (?:by|with|using) AI)\.?$/i, '')
  .replace(/^(?:AI\s*生成|人工智能生成)[：:]\s*/, '')
  .trim();
}
