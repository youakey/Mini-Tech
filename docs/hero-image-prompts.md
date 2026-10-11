# Изображения главного баннера

Созданы встроенным imagegen. Итоговые файлы:

- `public/images/hero/desktop.webp` — широкий фон без машины.
- `public/images/hero/mobile-v2.webp` — цельное вертикальное фото с машиной на грунте.
- `public/images/hero/excavator-cutout.webp` — прозрачный фотографический слой машины.
- `public/images/hero/bucket-earth.webp` — земля для наполненного ковша.

На компьютере машина въезжает справа по горизонтали без изменения размера. Гусеницы сохранены в исходном фотографическом виде. Сдвиг текстуры и вращение фотослоёв катков отключены из-за смазывания; для реалистичного движения требуется видео или заранее отрендеренная последовательность. Стрела, рукоять и ковш разделены SVG-масками и поворачиваются вокруг шарниров; при зачерпывании появляется земля. Это анимация фотослоёв, не видео и не 3D-модель. На телефоне используется цельное отдельное фото с очень плавным приближением. При prefers-reduced-motion машина и фон неподвижны, длинная сцена отключается.

## Цельная мобильная композиция после проверки

Use case: photorealistic-natural. Asset: a complete integrated portrait 9:16 photo for a phone homepage, not a transparent cutout. Style reference: the supplied warm sunset excavator photo. Create an elegant natural cinematic photograph of a Belarusian suburban building plot at golden hour. A SMALL compact yellow tracked excavator with enclosed cabin is naturally standing on the soil in the LOWER RIGHT THIRD, complete machine and boom in view, slightly distant, taking at most the lower 30 percent of image height. It must be grounded with convincing contact shadows, no floating, no pasted cutout appearance. Similar country homes and trees distant. Upper 65 percent is quiet dark sky and subdued background suitable for centrally placed white title and buttons, with no machinery overlapping this area. Amber rim light, charcoal shadows, authentic earth textures, balanced subtle commercial photography. No text or logo or people or UI. Crucially, enough distance around the machine so it belongs naturally to the landscape; do not make it a giant foreground excavator.

## Земля для ковша

Use case: photorealistic-natural. Asset: a transparent photographic sprite of freshly excavated dark brown soil, to overlay inside a mini excavator bucket in a warm sunset photograph. Reference provides the material and lighting atmosphere only. ONLY a small shallow horizontal mound of coarse brown earth with small stones and natural clods, seen from a slightly elevated SIDE view, warmly lit from upper right, deep shaded underside. The mound is a compact irregular wedge with a flat shallow bottom, wider horizontally than tall, roughly 3:1 width-height. A few loose crumb edges, no equipment, no bucket, no landscape, no text, no shadow outside the object. Real excavated earth, not sand, not a neat landscaping pile. Entire background genuinely transparent.

## Основное фото и стиль

Use case: photorealistic-natural. Asset type: desktop website hero background for a mini excavator rental company in Brest Belarus; brand dark charcoal and warm amber. Primary request: a beautiful professional realistic editorial photograph of a compact yellow tracked mini excavator with enclosed glass cabin and black boom, beside neat earth excavation on a suburban construction site in Belarus. It must look like a real compact 3-ton machine, not a giant mining excavator. Landscape wide 16:9 composition. Excavator occupies right third of frame, machine and boom fully in frame, attractive three-quarter front side view; restrained low residential construction and trees in the distance. The centre and left two-thirds are simple darker open site and softly atmospheric background, ample quiet space for large centrally positioned white and amber Russian website title and two CTA buttons. Warm late afternoon side-light picking out the yellow machine and dusty textures, subdued charcoal shadows, cinematic but natural and credible, polished commercial photograph with authentic used machinery. No text, no logos, no people, no lens flares, no glowing effects, no fantasy geometry, no aggressive demolition, no unrelated vehicles. Do not bake website text, gradients, UI or borders into the photo.

## Чистый фон компьютера

Use case: precise-object-edit. Edit target: the referenced construction site photograph. Remove the entire excavator, including cabin, body, tracks, blade, boom and bucket, and naturally reconstruct the ground, soil piles, houses and sky behind it. Keep the EXACT original landscape framing, viewpoint, light, warm evening colours, buildings, trees and terrain elsewhere. This is the clean background plate for a photographic excavator animation; do not introduce other equipment, people, text, or UI. Return the clean landscape photograph.

## Прозрачный фотослой экскаватора

Use case: background-extraction. Edit target: the referenced construction photograph. Remove ALL background and ground, making them genuinely transparent. Keep ONLY the complete yellow excavator, including ALL tracks, blade, cabin glass, body, boom, hydraulic rods, stick and bucket. Preserve the machine's exact side perspective, used textures, warm lighting and articulation. CRITICAL: retain the EXACT original full landscape canvas, size and image coordinates; leave the transparent left area intact. Do NOT centre, reposition, crop, resize, rotate, or change any part of the excavator. Transparent pixels where original sky, buildings, trees, soil and ground were. No cast shadow outside machine. No text.

## Отдельное фото для телефона

Use case: photorealistic-natural. Reference image is style and setting guidance only. Generate a NEW portrait 9:16 background photograph for the mobile homepage of a mini excavator rental company. Same beautiful warm late afternoon construction site atmosphere in suburban Belarus: dark textured earth and a shallow excavation in lower half, quiet tree line and distant small residential roofs, warm sunset sky, darker charcoal and muted warm amber tones. No excavator, no machinery, no people: an animated excavator will be overlaid separately near the bottom. The upper two thirds and centre should be quiet and unobtrusive for a centrally positioned Russian white title and action buttons. Photorealistic, restrained cinematic commercial quality, no fake text, no logos, no watermarks, no UI. Distinct portrait framing composed specifically for a phone, not a crop of the landscape photograph.
