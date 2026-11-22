import type {SpanishPage} from './types';

export const corePages: SpanishPage[] = [
 {
  en:'/', path:'/', title:'Mecanizado CNC de precisión para piezas a medida',
  lead:'Mecanizamos carcasas de aluminio, ejes y otras piezas complejas según tu plano. Podemos fabricar una primera pieza para validar el diseño o preparar una serie corta.',
  cover:'milling-enclosure-operation', alt:'Fresa y carcasa de aluminio dentro de un centro de mecanizado CNC',
  sections:[
   {title:'Fresado, torneado y mecanizado de cinco ejes', body:['Una cavidad profunda limita el alcance de la fresa. Un agujero inclinado obliga a orientar la pieza o la herramienta. Revisamos el plano para decidir cómo sujetar la pieza y qué operaciones conviene hacer en cada montaje.'], links:['/capabilities/cnc-milling-service/','/capabilities/cnc-turning-service/','/capabilities/5-axis-cnc-machining/']},
   {title:'Piezas y montajes de referencia', body:['En la galería puedes buscar una carcasa, un impulsor, un bloque o un racor parecido al tuyo. Los casos de mecanizado muestran cómo se sujeta cada pieza y desde qué cara entra la herramienta.'], links:['/machined-parts/gallery/','/machined-parts/machining-examples/']},
   {title:'Inspección dimensional según plano', body:['En nuestro taller de Hangzhou disponemos de máquinas de medición por coordenadas (CMM), medidores de altura de precisión y equipos de medición óptica. Antes de fabricar, acordamos las cotas críticas, el método de control y el informe necesario.'], links:['/factory/']},
  ],
 },
 {
  en:'/capabilities/',path:'/capacidades/',title:'Procesos de mecanizado CNC y materiales',
  lead:'La elección del proceso empieza por la forma de la pieza, la posición de las cotas críticas y el acceso de la herramienta. También cuentan el material, el acabado y la cantidad.',
  cover:'milling-enclosure-operation',alt:'Carcasa de aluminio sujeta en una fresadora CNC',
  sections:[
   {title:'Fresado, torneado y mecanizado de varias caras',body:['Con el fresado se hacen cavidades, caras planas y grupos de agujeros. El torneado se utiliza para mecanizar diámetros coaxiales, escalones y roscas. Si el plano combina caras inclinadas o perfiles curvos, revisamos si bastan varios montajes o conviene una máquina de cinco ejes.'],links:['/capabilities/cnc-milling-service/','/capabilities/cnc-turning-service/','/capabilities/5-axis-cnc-machining/','/capabilities/casting-machining/']},
   {title:'Material y acabado',body:['Indica la aleación o el grado, el estado del material y las superficies que necesitan acabado. Si un diámetro tiene que cumplir la tolerancia después de anodizar o recubrir, márcalo expresamente.'],links:['/capabilities/aluminum-cnc-parts/','/capabilities/stainless-steel-cnc-parts/','/capabilities/copper-brass-cnc-parts/','/capabilities/plastic-machined-parts/']},
   {title:'De la primera pieza a la serie corta',body:['Un prototipo sirve para comprobar el montaje. Para una serie, también hay que fijar la revisión del plano, la cantidad de cada referencia y cómo se aprueba la primera pieza.'],links:['/capabilities/prototype-machining/','/capabilities/low-volume-production/','/capabilities/starting-with-a-sample/']},
  ],
 },
 {
  en:'/factory/',path:'/taller/',title:'Taller CNC y control de calidad en Hangzhou',
  lead:'Conoce el taller de LZZ y cómo pasamos del plano a la inspección final. El taller de Hangzhou ocupa 1 500 m² y cuenta con más de 40 máquinas y equipos auxiliares.',
  cover:'workshop-wide',alt:'Vista general del taller de mecanizado CNC de LZZ en Hangzhou',
  sections:[
   {title:'Preparación del trabajo',body:['Disponemos de centros de fresado CNC y tornos. Cuando hay que trabajar varias caras, valoramos si un centro de cinco ejes mejora el acceso y ayuda a conservar la posición relativa de los elementos mecanizados.'],links:['/capabilities/','/machined-parts/machining-examples/']},
   {title:'Qué medimos y cómo',body:['La máquina de medición por coordenadas permite comprobar la posición de los agujeros y otras relaciones geométricas. Según la cota y el acceso, utilizamos medidores de altura de precisión o equipos de medición óptica. Para roscas, rugosidad y espesor de recubrimiento, confirma el método y el informe en la cotización.']},
   {title:'Documentos para homologar al proveedor',body:['Consulta la información de la empresa y las copias de los documentos disponibles. Para un pedido nuevo, especifica si necesitas certificado del material, identificación por lote o informe de primera pieza.'],links:['/about/company-profile/','/resources/ordering/rfq-checklist/']},
  ],
 },
 {
  en:'/machined-parts/',path:'/piezas/',title:'Piezas CNC fabricadas a medida',
  lead:'Busca una pieza de forma parecida o consulta cómo se sujeta en la máquina. Puedes usar la referencia para explicar lo que necesitas y adjuntar tu plano para definir el pedido.',
  sections:[
   {title:'Busca una forma parecida a tu pieza',body:['Un bloque perforado y una carcasa con paredes finas pueden requerir fresado, pero se sujetan de forma distinta. En la galería encontrarás carcasas, ejes, impulsores, racores y piezas de plástico.'],links:['/machined-parts/gallery/']},
   {title:'Ve cómo se mecaniza',body:['Los ejemplos del taller muestran cómo cambia el acceso al girar o volver a sujetar una pieza. Son una buena referencia si te preocupa una superficie de apoyo, una pared delicada o la posición de un agujero entre dos caras.'],links:['/machined-parts/machining-examples/']},
  ],
 },
 {
  en:'/machined-parts/gallery/',path:'/piezas/galeria/',title:'Galería de piezas mecanizadas',
  lead:'Consulta las referencias de LZZ para buscar una forma o una interfaz parecida a la de tu plano. Cada ficha indica qué conviene concretar antes de cotizar la pieza.',
  listing:'parts',
 },
 {
  en:'/machined-parts/machining-examples/',path:'/piezas/ejemplos-de-mecanizado/',title:'Ejemplos de mecanizado CNC',
  lead:'Desde un panel de 29 pulgadas hasta una pieza cilíndrica torneada y fresada. Los ejemplos muestran cómo se apoya la pieza, qué caras se trabajan y qué relaciones se comprueban al finalizar.',
  listing:'examples',
 },
 {
  en:'/resources/',path:'/recursos/',title:'Recursos técnicos para comprar piezas CNC',
  lead:'Prepara una solicitud de cotización, compara ofertas y deja claros los requisitos del plano. Las guías están pensadas para compras, ingeniería y calidad.',
  sections:[
   {title:'Cotización y pedidos',body:['Encuentra listas de comprobación para enviar una solicitud completa, comparar ofertas con el mismo alcance y aprobar la primera pieza.'],links:['/resources/ordering/']},
   {title:'Guías técnicas de mecanizado',body:['Consulta qué indican los ajustes, las tolerancias y las referencias del plano, o cómo influyen el material y el acabado en la forma de inspeccionar.'],links:['/resources/technical-guides/']},
   {title:'Dudas antes de enviar el plano',body:['Revisa los formatos de archivo, las cantidades y los datos que hacen falta para cotizar.'],links:['/resources/faq/']},
  ],
 },
 {en:'/resources/ordering/',path:'/recursos/pedidos/',title:'Cotización y pedidos de piezas CNC',lead:'Guías para preparar una solicitud de cotización, comparar ofertas, aprobar el prototipo y organizar el envío.',listing:'ordering'},
 {en:'/resources/technical-guides/',path:'/recursos/guias-tecnicas/',title:'Guías técnicas de mecanizado CNC',lead:'Referencias de plano, selección del proceso, materiales, anodizado e inspección. Las guías explican qué detalles del plano conviene resolver antes de fabricar.',listing:'guides'},
 {
  en:'/resources/faq/',path:'/recursos/preguntas-frecuentes/',title:'Preguntas frecuentes sobre pedidos CNC',
  lead:'Respuestas sobre planos, cantidades, acabados e informes de inspección antes de pedir una cotización.',
  sections:[
   {title:'¿Qué archivos necesita LZZ?',body:['Envía el plano 2D con revisión, tolerancias y notas. Adjunta un modelo STEP cuando la forma 3D sea importante. Si el modelo y el plano difieren, indica cuál debe prevalecer. El formulario admite hasta cinco archivos con un límite total de 20 MB.']},
   {title:'¿Puedo pedir una sola pieza?',body:['Aceptamos consultas desde una unidad. Indica si se trata de una prueba de montaje o de la primera pieza de una serie. El material, la geometría y el informe determinan el alcance y el plazo de la cotización.']},
   {title:'¿Qué tolerancia se puede alcanzar?',body:['En determinadas cotas críticas, ±0,01 mm puede servir como referencia. La tolerancia de cada cota se confirma tras revisar la geometría, el material, la sujeción y el método de medición.']},
   {title:'¿Se pueden incluir el acabado y la inspección?',body:['Indica las superficies visibles, las zonas de ajuste y el estado en que debe medirse la pieza. La cotización puede precisar el acabado, el muestreo, el informe dimensional y los documentos del material.'],links:['/resources/ordering/rfq-checklist/','/factory/']},
  ],
 },
 {
  en:'/about/',path:'/empresa/',title:'LZZ Precision, taller de mecanizado CNC en Hangzhou',
  lead:'LZZ Precision fabrica piezas a medida en Hangzhou, China. Antes de cotizar, revisamos tu plano, el acabado y las cotas que habrá que inspeccionar.',
  cover:'workshop-wide',alt:'Instalaciones de mecanizado de LZZ Precision',
  sections:[
   {title:'Empresa y taller',body:['La empresa se fundó en 2017. Trabajamos con carcasas de aluminio, piezas torneadas y componentes con superficies en varias orientaciones. Consulta el taller y la documentación para la homologación del proveedor.'],links:['/about/company-profile/','/factory/']},
   {title:'Coordina la revisión de tu pieza',body:['Para empezar, envía el plano, la cantidad prevista y el país de destino. Si una cota determina el encaje, indica con qué pieza se monta y cómo quieres comprobarlo.'],links:['/about/how-we-work/','/about/contact/','/about/company-news/']},
  ],
 },
 {
  en:'/about/company-profile/',path:'/empresa/perfil/',title:'Perfil de LZZ Precision',
  lead:'LZZ Precision es el nombre comercial de Hangzhou Lizhizao Precision Machinery Co., Ltd. Fundada en Hangzhou en 2017, la empresa fabrica piezas CNC según plano.',
  cover:'workshop-wide',alt:'Área de máquinas CNC de LZZ en Hangzhou',
  sections:[
   {title:'Trabajo de taller',body:['El equipo revisa el plano para decidir cómo sujetar la pieza, alcanzar las superficies críticas y comprobar las cotas. El fresado, el torneado y el mecanizado de cinco ejes se aplican de acuerdo con la geometría de cada trabajo.'],links:['/factory/','/machined-parts/machining-examples/']},
   {title:'Certificación y documentación',body:['La documentación de la empresa incluye un certificado ISO 9001, un reconocimiento de la provincia de Zhejiang como pyme de ciencia y tecnología y una placa que documenta una colaboración para la formación práctica en fabricación de precisión. Si necesitas homologarnos como proveedor, solicita el certificado vigente y verifica su titular, alcance y validez.']},
  ],
 },
 {
  en:'/about/how-we-work/',path:'/empresa/como-trabajamos/',title:'Cómo trabajamos, del plano a la entrega',
  lead:'Primero revisamos las cotas y la aplicación. La cotización recoge lo que se va a fabricar, inspeccionar y entregar.',
  sections:[
   {title:'Revisión técnica y cotización',body:['Envía la revisión del plano, el material, el acabado, la cantidad y el destino. Si hay una zona de sellado, un ajuste o una superficie que debe quedar sin marcas, indícala antes de preparar el proceso.']},
   {title:'Primera pieza y fabricación',body:['Si el pedido prevé aprobar una muestra, acordamos qué se mide y quién debe aprobarla. Un cambio de plano, material o acabado se revisa antes de fabricar el lote.']},
   {title:'Inspección, embalaje y pedidos repetidos',body:['Acordamos el muestreo, el informe y la protección de roscas o superficies delicadas. Para repetir un pedido, confirma la última revisión aprobada y cualquier cambio en la cantidad o en el destino.'],links:['/resources/ordering/','/factory/']},
  ],
 },
 {
  en:'/about/contact/',path:'/empresa/contacto/',title:'Contacto con LZZ Precision',
  lead:'Escríbenos para revisar un plano, preparar una cotización o coordinar una visita al taller de Hangzhou.',
  sections:[
   {title:'Correo y WhatsApp',body:['Puedes escribir a roger@lzz-cnc.com o al +86 138 5810 2479 por WhatsApp. Si adjuntas planos en el formulario, incluye la revisión y el material, la cantidad y el destino que tienes previstos.'],links:['/quote/']},
   {title:'Dirección del taller',body:['No. 4 Fengcheng Road, Pingyao, distrito de Yuhang, Hangzhou, Zhejiang, China. La hora local es UTC+8. Coordina la visita antes de desplazarte.'],links:['/factory/']},
  ],
 },
 {en:'/about/company-news/',path:'/empresa/noticias/',title:'Noticias de LZZ Precision',lead:'Visitas al taller, encuentros del sector y actividades del equipo de LZZ en Hangzhou.',listing:'news'},
 {en:'/quote/',path:'/cotizacion/',title:'Solicita una cotización de mecanizado CNC',lead:'Pide una cotización para fabricar tu pieza por CNC. Indica el material, la cantidad y el país de destino. Si tienes un plano, puedes adjuntarlo al formulario.',kind:'quote'},
 {
  en:'/privacy/',path:'/privacidad/',title:'Privacidad e información del sitio',
  lead:'Cómo tratamos tus datos de contacto, los archivos del proyecto y los datos de navegación.',
  sections:[
   {id:'your-inquiry',title:'Tu solicitud y tus archivos',body:['Usamos tu nombre, el destino y el medio de contacto para responder. La empresa, el mensaje y los archivos son opcionales. Puedes adjuntar hasta cinco archivos (20 MB en total) en PDF, STEP/STP, IGES/IGS, DXF/DWG, JPG/PNG o ZIP. Los archivos se envían al pulsar el botón de envío y quedan disponibles para el personal autorizado que atiende la consulta.','Verás un número de referencia cuando la solicitud quede guardada. Si falla el envío, puedes editar los datos sin salir de la página. Al recargarla se borran los campos que aún no hayas enviado. El correo electrónico y WhatsApp se rigen por sus propias políticas.']},
   {id:'visit-analytics',title:'Datos de navegación',body:['Medimos visitas, páginas y productos consultados, así como interacciones con enlaces y formularios. Podemos registrar la plataforma de procedencia, el dominio del sitio que te remitió y las etiquetas de campaña, el tipo de dispositivo y el país. Si envías una solicitud con la medición activa, podemos relacionarla con las visitas de ese navegador.','El identificador del navegador puede durar hasta 180 días. Una visita caduca tras 30 minutos sin actividad registrada. La medición excluye lo que escribes sin enviar, los términos de búsqueda, las direcciones IP completas y el contenido de los mensajes o archivos. Puedes desactivar la medición en esta página. Respetamos las señales Do Not Track y Global Privacy Control.']},
   {title:'Servicios y consultas',body:['Cloudflare proporciona el alojamiento, el almacenamiento y la protección contra envíos automatizados. Para preguntar por tus datos o solicitar su eliminación, escribe a roger@lzz-cnc.com. La geometría, las tolerancias y las condiciones de cada pedido se rigen por el plano y la cotización aceptada.']},
  ],
 },
];
