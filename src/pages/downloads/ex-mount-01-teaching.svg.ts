import {renderTeachingDrawing} from '../../data/teachingMountExample';
export const prerender=true;
export function GET(){return new Response(renderTeachingDrawing(),{headers:{'Content-Type':'image/svg+xml; charset=utf-8','Content-Disposition':'attachment; filename="ex-mount-01-teaching.svg"'}});}
