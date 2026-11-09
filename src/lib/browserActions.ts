// Browser actions are only called from an explicit copy or download control.
export async function copyPlainText(text:string) {
 if(!text.trim()||!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
 let timer:ReturnType<typeof setTimeout>|undefined;
 try {
  await Promise.race([
   navigator.clipboard.writeText(text),
   new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error('Clipboard timed out')),3000);}),
  ]);
 } finally {if(timer)clearTimeout(timer);}
}

export function downloadTextFile(text:string,filename:string) {
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
 const anchor=document.createElement('a');
 try {
  anchor.href=url;anchor.download=filename;anchor.hidden=true;
  document.body.append(anchor);anchor.click();
 } finally {anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
}
