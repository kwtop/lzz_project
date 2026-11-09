import {renderTeachingInspectionCsv} from '../../data/teachingMountExample';
export const prerender=true;
export function GET(){return new Response(renderTeachingInspectionCsv(),{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="ex-mount-01-teaching-inspection.csv"'}});}
