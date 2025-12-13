import type { Thing, WithContext } from 'schema-dts';

interface JsonLdProps {
  data: Thing | Thing[] | WithContext<Thing> | WithContext<Thing>[]
  id?: string
}

export function JsonLd({ data, id }: JsonLdProps) {
  const jsonLd = Array.isArray(data) ? data : [data]

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={id || `jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 0)
          }}
        />
      ))}
    </>
  )
}

