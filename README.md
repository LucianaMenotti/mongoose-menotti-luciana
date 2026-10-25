# mongoose-menotti-luciana

# Agencia de citas para gatos

## Idea del proyecto

Una agencia que organiza citas entre gatos. Cada colección representa una parte del negocio.

1. Agencia: es la empresa que registra a los gatos. Por ejemplo, "Cupido Gatuno", con el lema "Un maullido, un match".
2. Gato: es cada gato inscripto en una agencia. Guarda su nombre, su edad, su raza y sus gustos, que son la comida favorita y el pasatiempo. Por ejemplo, Michi, de 3 años, siamés, a quien le gusta el atún y dormir al sol.
3. Collar: cada gato tiene un solo collar, con un color y una frase grabada. Por ejemplo, un collar rosa con la frase "Busco amor".
4. Cita: es un encuentro con lugar y fecha, al que van varios gatos. Un mismo gato puede ir a muchas citas.

## Justificación: embebido o referenciado

En cada relación elegí entre guardar el dato dentro del mismo documento (embebido) o guardar el id de otro documento (referenciado). Embebí lo que pertenece a un solo documento y se usa junto con él. Referencié lo que puede crecer, lo que existe por sí mismo o lo que se consulta por separado.

### Propiedad embebida: gustos dentro de Gato

Los gustos del gato son la comida favorita y el pasatiempo. Los guardé dentro del documento del gato.

Los embebí porque pertenecen a un solo gato y no se comparten. Siempre se leen junto con el gato y se modifican junto con él. Además son siempre dos campos, por lo que no crecen.

Si fueran una colección aparte, tendría que hacer una consulta extra cada vez y no ganaría nada.

### Relación uno a muchos: Agencia y Gato

Cada gato guarda el id de su agencia en el campo agencia.

Lo referencié porque una agencia puede tener muchos gatos, y esa cantidad puede crecer sin límite. Si los guardara dentro de la agencia, su documento crecería con cada gato nuevo. Además, cada gato se consulta, se modifica y se elimina por separado.

Guardé la referencia del lado del gato. Para traer una agencia con sus gatos usé un populate virtual, porque la agencia no tiene guardados los ids.

### Relación uno a uno: Gato y Collar

El collar guarda el id del gato en el campo gato. Ese campo es unique, por lo que un gato no puede tener dos collares.

Lo referencié porque el collar se crea, se cambia y se elimina por separado. Además, un gato puede no tener collar. Si estuviera embebido, el collar tendría que existir desde que se crea el gato.

### Relación muchos a muchos: Gato y Cita

Un gato puede ir a muchas citas y una cita reúne a muchos gatos. La cita guarda un arreglo llamado participantes, con los ids de los gatos.

Lo referencié porque ambos existen por sí mismos. Un gato existe sin citas y una cita se crea antes de tener participantes.

Guardé el arreglo en la cita porque tiene pocos participantes. En cambio, las citas de un gato crecen con el tiempo. Los gatos se agregan con una ruta propia, que valida que el gato exista y que no esté repetido.