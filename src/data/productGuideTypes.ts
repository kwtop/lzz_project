export type ProductDiagramKind='enclosure'|'circular'|'shaft'|'fitting'|'casting'|'plastic'|'impeller'|'masking'|'manifold'|'plunger';
export interface ProductTechnicalGuide {
 title:string;seoTitle:string;slug:string;description:string;summary:string;intro:string;
 productSlug:string;capabilitySlug:string;diagram:ProductDiagramKind;diagramAfter:string;
 diagramCaption:string;legend:string[];sections:{id:string;title:string;html:string}[];
 related:string[];closing:string;nextText:string;
}
export function featureTable(columns:string[],rows:string[][]):string {
 if(rows.some(row=>row.length!==columns.length))throw new Error('Product guide table has an incomplete row');
 return '<table class="rd-table rd-stacked"><thead><tr>'+columns.map(label=>'<th scope="col">'+label+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map((cell,i)=>i===0?'<th scope="row">'+cell+'</th>':'<td data-label="'+columns[i]+'">'+cell+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
}
