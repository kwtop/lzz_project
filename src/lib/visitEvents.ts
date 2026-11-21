export const publicEventTypes = [
  'page_view', 'product_view', 'parameters_expand', 'parameters_collapse', 'details_expand', 'details_collapse', 'image_view',
  'link_click', 'button_click', 'filter_change', 'download_click', 'quote_click',
  'whatsapp_click', 'email_click', 'phone_click', 'form_start', 'attachment_select',
  'form_submit', 'form_error',
] as const;

export type PublicEventType = typeof publicEventTypes[number];
export type VisitEventType = PublicEventType | 'inquiry_success';

export const highIntentEvents = new Set<VisitEventType>([
  'quote_click', 'whatsapp_click', 'email_click', 'phone_click', 'download_click',
  'form_start', 'attachment_select', 'form_submit', 'form_error', 'inquiry_success',
]);

export const contactEvents = ['quote_click', 'whatsapp_click', 'email_click', 'phone_click'] as const;
