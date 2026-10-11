import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { EQUIPMENT_DATA } from '@/data/equipment';

export function EquipmentSection({ catalog = false }: { catalog?: boolean }) {
  const featured = [...EQUIPMENT_DATA].filter((equipment) => equipment.featured).sort((a, b) => a.order - b.order);
  const Heading = catalog ? 'h1' : 'h2';

  return (
    <section id="equipment" className={catalog ? 'py-10 sm:py-16 bg-bg' : 'section bg-bg'} aria-labelledby="equipment-heading">
      <div className="container-site">
        <div className="text-center mb-8 sm:mb-12">
          <div className="accent-line mx-auto" />
          <Heading id="equipment-heading" className="section-title">Наша техника</Heading>
          <p className="section-subtitle max-w-2xl mx-auto">
            Три мини-экскаватора с оператором для земляных работ и демонтажа.
            Выберите машину или опишите задачу — поможем подобрать технику.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((equipment) => (
            <EquipmentCard key={equipment.slug}
              id={equipment.slug} name={equipment.name} description={equipment.shortDescription}
              imageSrc={equipment.images[0]?.src ?? '/images/equipment-placeholder.webp'}
              imageAlt={equipment.images[0]?.alt ?? equipment.name} cardSpecs={equipment.cardSpecs}
              href={`/equipment/${equipment.slug}/`} price={equipment.priceDisplay} />
          ))}
        </div>
      </div>
    </section>
  );
}
