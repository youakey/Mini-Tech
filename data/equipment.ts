// Данные о технике — добавление нового объекта в массив автоматически
// создаёт страницу /equipment/[slug]/, карточку на главной и пункт в меню.

export type EquipmentType = 'excavator' | 'loader' | 'other';

// Ключ иконки для карточки — рендерится в EquipmentCard.tsx через Lucide
export type SpecIconKey = 'weight' | 'power' | 'depth' | 'lift' | 'tip-load';

export interface EquipmentSpec {
  label: string;
  value: string;
}

export interface EquipmentCardSpec {
  iconKey: SpecIconKey;
  label: string;
  value: string;
}

export interface SeoSection {
  h3: string;
  paragraphs: string[];
}

export interface Equipment {
  slug: string;
  name: string;
  type: EquipmentType;
  /** Метка категории, например «Мини-экскаватор» */
  category: string;
  /** Короткое описание для карточки (1–2 предложения) */
  shortDescription: string;
  /** Полный список ТТХ для таблицы на странице */
  specs: EquipmentSpec[];
  /** 3 ключевых параметра для карточки на главной */
  cardSpecs: EquipmentCardSpec[];
  /** Перечень операций, которые может выполнять техника */
  capabilities: string[];
  priceDisplay: string;
  priceNote: string;
  minBooking: string;
  attachments?: {
    name: string;
    priceFrom: number;
    priceNote: string;
    description: string;
  }[];
  /** Картинки: src — путь в /public, alt — SEO-alt */
  images: { src: string; alt: string }[];
  /** Показывать ли на главной странице */
  featured: boolean;
  /** Порядок сортировки (меньше = выше) */
  order: number;
  seo: {
    title: string;
    metaDescription: string;
    ogDescription: string;
    capabilitiesTitle: string;
    capabilitiesSubtitle: string;
    /** Блоки SEO-текста на странице техники */
    seoSections: SeoSection[];
  };
}

export const EQUIPMENT_DATA: Equipment[] = [
  {
    slug: 'volvo-ec25',
    name: 'Мини-экскаватор Volvo EC 25',
    type: 'excavator',
    category: 'Мини-экскаватор',
    shortDescription:
      'Компактный экскаватор для работы на небольших участках. Идеален для работы в стеснённых условиях: у заборов, деревьев, построек. Рытьё котлованов под фундамент и септики в Бресте.',
    specs: [
      { label: 'Эксплуатационная масса', value: '2 580 кг' },
      { label: 'Мощность двигателя', value: '18,5 кВт (25 л.с.)' },
      { label: 'Максимальная глубина копания', value: '2 840 мм' },
      { label: 'Вместимость ковша', value: '0,06–0,09 м³' },
      { label: 'Габаритные размеры (Д×Ш×В)', value: '3 860 × 1 530 × 2 450 мм' },
      { label: 'Аренда от', value: 'от 85 BYN/час' },
      { label: 'Минимальная смена', value: '4 часа' },
    ],
    cardSpecs: [
      { iconKey: 'weight', label: 'Масса', value: '2 580 кг' },
      { iconKey: 'power', label: 'Мощность', value: '25 л.с.' },
      { iconKey: 'depth', label: 'Глубина', value: '2 840 мм' },
    ],
    capabilities: [
      'Рытьё котлованов под фундамент, бассейн, септик',
      'Копка траншей под водопровод, канализацию, электрику',
      'Планировка и выравнивание территории',
      'Выкорчёвка пней',
      'Погрузка грунта и сыпучих материалов',
      'Работы в стеснённых условиях: у заборов, стен, деревьев',
    ],
    priceDisplay: 'от 85 BYN/час',
    priceNote: 'BYN/час',
    minBooking: '4 часа',
    attachments: [
      {
        name: 'Гидромолот',
        priceFrom: 120,
        priceNote: 'BYN/час',
        description:
          'Опционально: можно заказать технику с гидромолотом для разрушения бетона, кирпича, асфальта и скальных пород, либо без него — только с ковшом.',
      },
    ],
    images: [
      { src: '/images/equipment/volvo-ec25/thumb.webp', alt: 'Мини-экскаватор Volvo EC 25 с гидромолотом на объекте' },
    ],
    featured: true,
    order: 1,
    seo: {
      title: 'Аренда мини-экскаватора Volvo EC25 в Бресте | МиниТех Брест',
      metaDescription:
        'Аренда мини-экскаватора Volvo EC25 с оператором в Бресте и Брестской области. Рытьё котлованов, траншей, планировка участка. Цена от 85 BYN/час. Выезд в день обращения.',
      ogDescription:
        'Аренда мини-экскаватора Volvo EC25 с оператором в Бресте. Цена от 85 BYN/час, минимальная смена 4 часа.',
      capabilitiesTitle: 'Что умеет экскаватор',
      capabilitiesSubtitle: 'Аренда мини-экскаватора Volvo EC25 в Бресте и Брестской области',
      seoSections: [
        {
          h3: 'Аренда мини-экскаватора Volvo EC25 в Бресте — почему выбирают нас',
          paragraphs: [
            'Мини-экскаватор Volvo EC 25 — это компактная, мощная машина для работы на небольших участках, которая незаменима при работе в ограниченном пространстве. В отличие от полноразмерных экскаваторов, EC25 свободно работает у забора, под кронами деревьев, вдоль стен построек, не повреждая окружающую территорию.',
            'Мы предоставляем технику с опытным оператором. Наши специалисты знают особенности грунтов Брестской области и выполняют работы аккуратно и в срок. Перед началом работ обязательно уточняем расположение подземных коммуникаций — это входит в стандарт нашей работы.',
            'Работаем по всей Брестской области: Берёза, Барановичи, Пинск, Кобрин, Пружаны и другие населённые пункты. Доставка техники на объект рассчитывается индивидуально. В большинстве случаев можем организовать выезд в день обращения.',
          ],
        },
        {
          h3: 'Как работает аренда мини-экскаватора',
          paragraphs: [
            'Оставьте заявку на сайте или позвоните — менеджер свяжется с вами в течение 15 минут. Уточним объём работ, адрес объекта, удобное время. Рассчитаем стоимость и согласуем дату выезда. Оплата производится по факту выполненных работ наличными или безналичным переводом.',
          ],
        },
      ],
    },
  },

];

// Паспортные параметры новых машин уточняются у владельца.
// Карточки описывают назначение техники без неподтверждённых числовых характеристик.
const additionalEquipment = [
  {
    slug: 'messersi-m18be', model: 'Messersi M-18BE', order: 2,
    description: 'Компактный мини-экскаватор для земляных работ на частных участках. Подойдёт для траншей под коммуникации, подготовки основания и работы рядом с забором или постройками.',
    tasks: ['Копка траншей под коммуникации', 'Земляные работы на частных участках', 'Подготовка основания под благоустройство', 'Погрузка грунта и планировка территории'],
    images: [{ src: '/images/equipment/messersi-m18be/thumb.webp', alt: 'Мини-экскаватор Messersi M-18BE с ковшом на участке' }],
  },
  {
    slug: 'xcmg-xe35u', model: 'XCMG XE-35U', order: 3,
    description: 'Мини-экскаватор для котлованов, траншей и демонтажа. Ковш — для земляных работ и погрузки, гидромолот — для разрушения бетона и твёрдых покрытий.',
    tasks: ['Рытьё котлованов и траншей', 'Демонтаж бетона и покрытий гидромолотом', 'Погрузка строительного мусора и грунта', 'Расчистка и подготовка площадки'],
    images: [
      { src: '/images/equipment/xcmg-xe35u/thumb.webp', alt: 'XCMG XE-35U с гидромолотом выполняет демонтаж бетона' },
      { src: '/images/equipment/xcmg-xe35u/work.webp', alt: 'XCMG XE-35U с ковшом на рабочем объекте' },
    ],
  },
];

for (const machine of additionalEquipment) {
  EQUIPMENT_DATA.push({
    slug: machine.slug, name: `Мини-экскаватор ${machine.model}`, type: 'excavator', category: 'Мини-экскаватор',
    shortDescription: machine.description,
    specs: [
      { label: 'Модель', value: machine.model },
      { label: 'Управление', value: 'С оператором' },
      { label: 'Стоимость аренды', value: 'от 85 BYN/час' },
      { label: 'Минимальное время аренды', value: '4 часа' },
      { label: 'Доставка', value: 'Брест и Брестская область' },
    ],
    cardSpecs: [
      { iconKey: 'depth', label: 'Работы', value: 'Земляные' },
      { iconKey: 'power', label: 'Аренда', value: 'С оператором' },
      { iconKey: 'weight', label: 'Выезд', value: 'От 4 часов' },
    ],
    capabilities: machine.tasks, priceDisplay: 'от 85 BYN/час', priceNote: 'BYN/час', minBooking: '4 часа',
    images: machine.images, featured: true, order: machine.order,
    seo: {
      title: `Аренда ${machine.model} в Бресте`,
      metaDescription: `Аренда мини-экскаватора ${machine.model} с оператором в Бресте и Брестской области. ${machine.description} Стоимость от 85 BYN/час.`,
      ogDescription: machine.description,
      capabilitiesTitle: 'Для каких работ подойдёт',
      capabilitiesSubtitle: `Подберём ${machine.model} под задачу и условия вашего участка`,
      seoSections: [{ h3: `Как заказать ${machine.model}`, paragraphs: [
        'Сообщите адрес объекта, вид работ и желаемую дату. Уточним условия подъезда, объём работ и необходимое оборудование, затем согласуем стоимость аренды и доставки.',
        'Техника предоставляется с оператором. Если не знаете, какая машина нужна, опишите задачу или отправьте фотографии участка в Telegram — поможем выбрать подходящий вариант.',
      ] }],
    },
  });
}
