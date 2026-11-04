# Generar informe de una nueva version

## Uso habitual

1. Ejecuta el unico acceso `01_Actualizaciones/GENERAR_INFORME_VERSION.bat` e ingresa `7.2` (o cualquier version futura).
2. Espera la consulta de personajes, armas, materiales (incluidas flores y especialidades locales), talentos, constelaciones, dominios, enemigos y artefactos en los cinco idiomas de la web, la consulta secundaria de predescarga y la busqueda de guias en KQM.
3. Abre la ultima carpeta de `downloads/versiones/7.2/` y lee `LEER_PRIMERO.md`, `formato_web/COBERTURA.md` y `formato_web/FICHAS.md`.
4. Para trabajar con ChatGPT, pide: **«Revisa el ultimo paquete de la version 7.2 en downloads/versiones e incorpora los datos verificados en local»**.
5. Despues de revisar el informe, incorporamos los datos verificados a la web local y ejecutamos las pruebas. La publicacion sigue siendo un paso separado.

Este BAT recopila informacion, genera el informe y prepara copias de los archivos en el formato real de Spirifly. No tiene menu de mantenimiento ni incorpora datos a la web. Los tres BAT anteriores quedan conservados como archivos `.bat.txt` en `herramientas_parches/archivo_bat/`, fuera del flujo de uso.

## Trabajo durante la predescarga

El flujo siempre considera los datos como previos al lanzamiento. No supone que las fuentes esten completas por estar disponible la predescarga del juego. Repite el mismo BAT cuando haya correcciones; cada resultado conserva su fecha y sus pendientes.

La fuente principal es genshin-db. La secundaria es la API publica de Yatta/Ambr: consulta la version anunciada, su registro de cambios por version, los indices y las fichas. El registro de cambios permite descubrir IDs de personajes y armas de la predescarga aunque la fuente principal todavia no los liste. No incorpora personajes beta de otra version por su sola condicion beta. Si no puede comprobar la version secundaria ni su registro de cambios, solo consulta las identidades conocidas o anunciadas en el manifiesto. No lee ni descifra los archivos de instalacion del juego.

Cuando genshin-db aun no tiene una ficha, el adaptador intenta completarla con Yatta, conservando las respuestas originales. Las cantidades contradictorias bloquean el paquete hasta revisar la discrepancia. Las curvas de estadisticas solo se utilizan si hay datos suficientes para calcularlas; no se sustituyen con valores de otro personaje ni con aproximaciones.

Las fuentes pueden publicar despues del inicio de la predescarga y las guias especializadas pueden llegar despues del lanzamiento. El sistema prepara lo disponible y muestra lo pendiente; no garantiza tener todas las builds antes de que existan guias revisables.

Requisitos: Node.js 18 o superior y conexion a internet. No requiere instalar paquetes ni ingresar claves.

El lanzador resuelve el script por su ubicacion junto al BAT, desde la raiz del proyecto o desde `%USERPROFILE%\Documents\Spirifly`. Usa la ruta absoluta del script y no depende del directorio de trabajo de Windows. Una copia actualizada del BAT en el escritorio funciona si el proyecto permanece en esa ruta habitual. Si mueves el proyecto a otra ubicacion, usa el BAT que esta dentro de `01_Actualizaciones` o un acceso directo a el.

Cada ejecucion crea una carpeta distinta. Conserva las anteriores y permite identificar datos agregados o corregidos desde la consulta anterior de la misma version. No borra ni reemplaza resultados anteriores.

El informe selecciona personajes, armas, materiales y artefactos por el campo `version` de la fuente, aunque ya existan en la web. Incluye sus dependencias de materiales anteriores en los expedientes. Las otras diferencias del catalogo completo se muestran aparte como auditoria y no se consideran novedades. Una descarga antigua reprocesada puede necesitar una consulta nueva para obtener estadisticas y enlaces de builds que el generador anterior no solicito.

## Archivos del resultado

| Archivo | Contenido |
| --- | --- |
| LEER_PRIMERO.md | Resumen, candidatos, pendientes, fuentes consultadas y errores. |
| snapshot.json | Respuestas completas, estadisticas, URL y hora de cada consulta. |
| paquete.json | Comparacion por ID y nombre, expedientes de incorporacion, traducciones, talentos, constelaciones y materiales relacionados. |
| formato_web/paquete_web.json | Personajes, armas, materiales, fuentes de farmeo, traducciones, constelaciones y builds revisadas con las estructuras que utiliza Spirifly. |
| formato_web/COBERTURA.md | Estado por ficha, faltantes, discrepancias y requisitos para revisar el paquete. |
| formato_web/FICHAS.md | Tablas legibles de ascension y talentos, cantidades, flores, ubicaciones, dominios y dias de farmeo. |
| formato_web/archivos_web/ | Copias de los archivos web preparadas para integrar en local despues de la revision. |
| formato_web/INTEGRACION.json | Hashes de los archivos originales, estado del paquete y resultados de las pruebas sobre las copias. |
| formato_web/REVISION_BUILDS.json | Plantilla para revisar recomendaciones de guias especializadas; no se carga directamente en la web. |

Los costes se convierten a `coinCost` y `costItems` por salto, con ascensiones separadas de los talentos. Las fichas usan los IDs de Spirifly existentes y los tipos de arma, elemento e imagenes que espera la web. Los dominios y dias solo se convierten cuando hay una relacion verificable con el material; lo demas queda pendiente. La copia preparada conserva las demas fichas y se valida con las pruebas de la web sin sobrescribir los archivos activos.

Las cantidades de progresion estandar de personajes se mantienen como reglas reutilizables en `01_Actualizaciones/standard-costs.cjs`. Si falta una cantidad y los IDs de todos los materiales de ese salto estan identificados, se completa y se registra en `quantityAudit` y COBERTURA.md con el perfil `standard-character-v1`. No hay que investigar las mismas cantidades en cada version. La fuente descargada se conserva intacta. Si aparece una cantidad explicita o una estructura distinta del perfil, se conservan los datos originales y no se completan faltantes con ese perfil. El Viajero y los maniquies estan excluidos; las armas tampoco usan cantidades de personaje. Esto no sustituye los IDs de materiales, estadisticas propias, dominios ni recomendaciones de builds.

Los sets de artefactos nuevos quedan estructurados en el paquete, con sus efectos, traducciones y la ruta prevista para su flor, pero requieren verificar la imagen local y sus alias antes de incorporarlos a las builds. No se sustituyen sus imagenes por las de otro set.

`incomplete` significa que faltan datos, una fuente, una traduccion, una build revisada o una prueba valida. `prepared-for-local-review` significa que el paquete puede revisarse para integracion local; no es autorizacion para publicarlo ni confirmacion de datos finales de lanzamiento. Antes de copiar, comparar los hashes de INTEGRACION.json con los archivos locales. Si cambiaron, regenerar el paquete.

## Builds: fuentes especializadas

Las recomendaciones de builds se toman de [KeqingMains (KQM)](https://keqingmains.com/), comunidad especializada en guias y theorycrafting de personajes. La API de datos sirve para cantidades y estadisticas; no se usa como fuente de recomendaciones.

Cada consulta revisa el indice KQM y registra enlaces del personaje en `paquete.json`, dentro de `buildResearch`, incluso si el personaje esperado aun no aparece en la API. No inventa direcciones de guias: usa enlaces encontrados en el indice. Si no encuentra una guia, queda pendiente; esto no demuestra que no exista en otra pagina del sitio.

Encontrar el enlace no valida la build. Antes de incorporarla se registra la URL, version de la guia, fecha y revision de armas/refinamientos, artefactos, estadisticas, recarga, equipos y talentos. Los analisis previos al lanzamiento quedan como preliminares. No se sustituyen guias faltantes por recomendaciones inventadas o articulos genericos. El recolector conserva enlaces y metadatos, sin copiar guias completas.

Para incorporar una build revisada, completar la plantilla `REVISION_BUILDS.json` y guardarla como `01_Actualizaciones/versiones/7.2.builds.json` (sustituir 7.2 por la version correspondiente). Cada entrada debe contener `characterId`, `build` en el formato de `data_builds.js` y `source` con `url`, `guideVersion`, `reviewedAt` (AAAA-MM-DD) y `preliminary`. Se aceptan KQM y Prydwen como fuentes especializadas. La conversion comprueba identidad, armas compatibles y equipos de cuatro; despues ejecuta las pruebas existentes sobre las copias generadas. Una build vieja no se declara revisada para otra version automaticamente.

## Que significa el resultado

- **Candidato:** no coincide con el catalogo local. Puede pertenecer a otra version o quedar fuera del alcance de la web.
- **Coincidencia por nombre:** requiere revisar identidad porque no coincide un ID. No se cambia el ID local.
- **Pendiente en la fuente:** el personaje esperado todavia no aparece. No significa que no exista.
- **Descarga incompleta:** fallo una consulta. Se guardan las respuestas que si llegaron y el error completo. Repite la consulta cuando vuelva la conexion.
- **Consulta completada:** la fuente respondio. No garantiza que sus datos correspondan a la version mas reciente.

La fuente estructurada es comunitaria: [genshin-db API](https://github.com/theBowja/genshin-db-api). El programa usa los endpoints documentados de catalogos y estadisticas. Los anuncios oficiales se guardan como referencias en el manifiesto de la version; sus enlaces no se interpretan como tablas de materiales.

## Opciones de terminal

Desde la carpeta del proyecto:

```powershell
node 01_Actualizaciones/version-pipeline.cjs --version 7.2
node 01_Actualizaciones/version-pipeline.cjs --version 7.2 --languages es,en
node 01_Actualizaciones/version-pipeline.cjs --version 7.2 --from "downloads/versiones/7.2/CARPETA/snapshot.json"
node herramientas_parches/revisar.cjs datos
```

`--from` vuelve a comparar una descarga guardada con el estado actual de la web, sin consultar internet. Si contiene respuestas originales de Yatta, vuelve a ejecutar el adaptador sobre ellas: permite recuperar datos tras corregir el extractor sin repetir la descarga. Conserva la fecha original, marca las lecturas de cache y deja constancia de los errores recuperados con otra fuente. Si no se guardo una respuesta necesaria, lo indica. `--languages es,en` reduce las consultas; los otros idiomas aparecen como pendientes.

El adaptador reconoce los tres talentos por su progresion mejorable y sus ranuras/iconos, excluyendo pasivas. Conserva costes independientes por talento. El tipo de arma se obtiene del indice con codigos internos, no del nombre localizado. Las estadisticas aceptan las curvas `curveInfos`, y los jefes nuevos se relacionan con el material mediante `additions.droppedBy`. Estos casos estan cubiertos por respuestas reales de la predescarga 7.2.

Para versiones futuras se puede agregar un manifiesto `01_Actualizaciones/versiones/7.3.json` con `version`, `expectedCharacters`, `expectedWeapons`, `officialReferences` y `manualChecks`, siguiendo el ejemplo 7.2. Para predescarga conviene mantener esa lista con los anuncios verificados: permite buscar personajes esperados aunque la fuente principal aun no los liste. El recolector funciona sin manifiesto, pero no puede advertir que falta un personaje esperado que no conoce.

Codigos de salida: `0` paquete preparado para revision local; `2` paquete incompleto (consultar COBERTURA.md); `1` error que impidio terminar el proceso.

## Antes de publicar

Verificar materiales y cantidades por salto de ascension y talento, constelaciones, dias de dominios, jefes, armas compatibles, artefactos, imagenes, cinco idiomas y mecanicas especiales. Mantener IDs existentes y probar con planes guardados. La descarga no modifica los catalogos ni publica a produccion.
