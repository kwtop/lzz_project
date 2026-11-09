export {};
const notice=document.querySelector<HTMLElement>('[data-connection-status]');
const noticeMessage=notice?.querySelector<HTMLElement>('[data-connection-message]');
let noticeTimer:ReturnType<typeof setTimeout>|undefined;
function updateConnection() {
 if(!notice||!noticeMessage)return;
 if(noticeTimer)clearTimeout(noticeTimer);
 if(!navigator.onLine) {
  noticeMessage.textContent="You're offline. Loaded content is still available. Reconnect to open new pages or media.";
  notice.hidden=false;
 } else if(!notice.hidden) {
  noticeMessage.textContent='Connection restored. You can try loading the page or media again.';
  noticeTimer=setTimeout(()=>{notice.hidden=true;},5000);
 }
}
notice?.querySelector('[data-connection-dismiss]')?.addEventListener('click',()=>{notice.hidden=true;});
window.addEventListener('online',updateConnection);
window.addEventListener('offline',updateConnection);
updateConnection();

// Keep Tab within any open dialog, including the hydrated inquiry confirmation.
document.addEventListener('keydown',event=>{
 if(event.key!=='Tab')return;
 const modal=document.querySelector<HTMLDialogElement>('dialog[open]');
 if(!modal)return;
 const controls=Array.from(modal.querySelectorAll<HTMLElement>('a[href],button,input,select,textarea,summary,[tabindex]'))
  .filter(element=>element.tabIndex>=0&&!element.hasAttribute('disabled')&&element.getClientRects().length>0);
 const first=controls[0],last=controls.at(-1);
 if(!first)return;
 if(!modal.contains(document.activeElement)){event.preventDefault();(event.shiftKey?last:first)?.focus();}
 else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
},true);

const dialog=document.querySelector<HTMLDialogElement>('#site-image-dialog');
if(dialog&&typeof dialog.showModal==='function') {
 const image=dialog.querySelector<HTMLImageElement>('[data-media-image]')!;
 const stage=dialog.querySelector<HTMLElement>('.site-image-stage')!;
 const loading=dialog.querySelector<HTMLElement>('[data-media-loading]')!;
 const failure=dialog.querySelector<HTMLElement>('[data-media-error]')!;
 const failureMessage=dialog.querySelector<HTMLElement>('[data-media-error-message]')!;
 const caption=dialog.querySelector<HTMLElement>('#site-image-caption')!;
 const count=dialog.querySelector<HTMLElement>('[data-media-count]')!;
 const zoom=dialog.querySelector<HTMLButtonElement>('[data-media-zoom]')!;
 const previous=dialog.querySelector<HTMLButtonElement>('[data-media-previous]')!;
 const next=dialog.querySelector<HTMLButtonElement>('[data-media-next]')!;
 const openImage=dialog.querySelector<HTMLAnchorElement>('[data-media-open]')!;
 let items:HTMLAnchorElement[]=[],index=0,trigger:HTMLElement|null=null;
 let loadTimer:ReturnType<typeof setTimeout>|undefined;
 const isImage=(link:HTMLAnchorElement)=>{
  if(link.hasAttribute('download'))return false;
  try {const url=new URL(link.href);return url.origin===location.origin&&/\.(?:avif|gif|jpe?g|png|webp|svg)$/i.test(url.pathname);}
  catch {return false;}
 };
 const links=Array.from(document.querySelectorAll<HTMLAnchorElement>('main a[href]')).filter(isImage);
 links.forEach(link=>{
  link.dataset.mediaViewer='';
  link.setAttribute('aria-haspopup','dialog');
  link.setAttribute('aria-controls',dialog.id);
 });
 function resetZoom() {
  dialog!.dataset.view='fit';zoom.setAttribute('aria-pressed','false');zoom.textContent='Zoom in';
  stage.scrollTop=0;stage.scrollLeft=0;
 }
 function showError(message='This image could not be loaded. Check your connection and try again.') {
  if(!dialog!.open)return;
  if(loadTimer)clearTimeout(loadTimer);
  dialog!.dataset.state='error';stage.setAttribute('aria-busy','false');
  loading.hidden=true;image.hidden=true;failure.hidden=false;failureMessage.textContent=message;zoom.disabled=true;
 }
 function show(position:number,retry=false) {
  index=position;
  const item=items[index],thumbnail=item.querySelector('img')||item.closest('figure')?.querySelector('img');
  if(!retry)trackEvent('image_view',{position:'image-viewer',resource:item.href});
  const text=item.closest('figure')?.querySelector('figcaption')?.textContent?.replace(/\s+/g,' ').trim()||thumbnail?.alt||item.textContent?.trim()||'Image reference';
  if(loadTimer)clearTimeout(loadTimer);
  resetZoom();dialog!.dataset.state='loading';stage.setAttribute('aria-busy','true');
  caption.textContent=text;image.alt=thumbnail?.alt||text;
  count.textContent=`${index+1} / ${items.length}`;
  previous.disabled=index===0;next.disabled=index===items.length-1;zoom.disabled=true;
  openImage.href=item.href;loading.hidden=false;failure.hidden=true;image.hidden=true;
  const url=new URL(item.href);if(retry)url.searchParams.set('retry',Date.now().toString());
  loadTimer=setTimeout(()=>showError('The image is taking longer to load. Try again or open the image directly.'),15000);
  image.src=url.href;
 }
 image.addEventListener('load',()=>{
  if(!dialog!.open||!image.naturalWidth)return;
  if(loadTimer)clearTimeout(loadTimer);
  dialog!.dataset.state='loaded';stage.setAttribute('aria-busy','false');
  loading.hidden=true;failure.hidden=true;image.hidden=false;zoom.disabled=false;
 });
 image.addEventListener('error',()=>showError());
 document.addEventListener('click',event=>{
  if(!(event instanceof MouseEvent)||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const target=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[data-media-viewer]'):null;
  if(!target||!isImage(target))return;
  const scope=target.closest('[data-gallery-scope],.reference-gallery,#al-original-documents,.ce-documents,.ar-news-photos');
  const candidates=scope?links.filter(link=>scope.contains(link)):links;
  const unique=new Set<string>();
  items=candidates.filter(link=>{if(unique.has(link.href))return false;unique.add(link.href);return true;});
  const selected=items.findIndex(link=>link.href===target.href);
  if(selected<0)return;
  event.preventDefault();trigger=target;
  document.querySelector('.site-header')?.dispatchEvent(new Event('navigation:close'));
  dialog.showModal();show(selected);
 });
 dialog.querySelector('[data-media-close]')?.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{
  if(loadTimer)clearTimeout(loadTimer);
  image.removeAttribute('src');resetZoom();dialog.dataset.state='idle';
  trigger?.focus({preventScroll:true});
 });
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
 });
 function changeZoom() {
  if(zoom.disabled)return;
  const enlarged=dialog!.dataset.view!=='zoom';
  dialog!.dataset.view=enlarged?'zoom':'fit';zoom.setAttribute('aria-pressed',String(enlarged));zoom.textContent=enlarged?'Fit image':'Zoom in';
 }
 zoom.addEventListener('click',changeZoom);image.addEventListener('click',changeZoom);
 previous.addEventListener('click',()=>{if(index>0)show(index-1);});
 next.addEventListener('click',()=>{if(index<items.length-1)show(index+1);});
 dialog.querySelector('[data-media-retry]')?.addEventListener('click',()=>show(index,true));
 dialog.addEventListener('keydown',event=>{
  if(dialog.dataset.view==='zoom')return;
  if(event.key==='ArrowLeft'&&index>0){event.preventDefault();show(index-1);}
  if(event.key==='ArrowRight'&&index<items.length-1){event.preventDefault();show(index+1);}
 });
 window.addEventListener('pagehide',()=>{if(dialog.open)dialog.close();});
}
import {trackEvent} from '../lib/siteAnalytics';
