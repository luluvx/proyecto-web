export async function deleteCategory(id) {
    try {
        const response = await fetch(`http://localhost:3001/categorias/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            if (response.status === 400 && errorResponse.error === 'No se puede eliminar la categoría porque tiene cursos asignados.') {
                alert('No se puede eliminar la categoría porque tiene cursos asignados.');
            } else {
                throw new Error(errorResponse.error || 'Error al eliminar la categoría');
            }
        } else {
            const result = await response.json();
            console.log('Categoría eliminada:', result);

            document.dispatchEvent(new Event('categoriesUpdated'));
        }
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        alert('Error al eliminar la categoría');
    }
}
