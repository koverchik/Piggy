<script>
    $(document).ready(function() {
        const { pathname, origin } = new URL(window.location);

       $('.delete-button').on('click', function() {
            const id = $(this).data('id');
            const name = $(this).data('name');

            createModal(id, name, 'delete');

            $(`#delete-${id}`).modal('show');
        });

        function getActionPath(pathname, id) {
            if (pathname.includes('wallet')) {
                return `${origin}/wallet/${id}`;
            } else if (pathname.includes('budget')) {
                return `${origin}/budget/${id}`;
            }
        }

        function createModal(id, name, type) {
            const action = getActionPath(pathname, id);

            const form = $(`
            <form action="${action}" method="POST" id="form-${type}-${id}">
                @method("DELETE")
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
            </form>
        `)

        const modal = $(`
            <div class="modal fade" id="${type}-${id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${type}-${id}-label" aria-hidden="true">
               <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                           <div class="modal-header">
                             <h5 class="modal-title" id="${type}-${id}-label">${type.charAt(0).toUpperCase() + type.slice(1)}</h5>
                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                            Are you sure you want to delete "${name}" ${type}?
                        </div>
                        <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                             <button type="submit" form="form-${type}-${id}" class="btn btn-primary">Delete</button>
                         </div>
                     </div>
                 </div>
            </div>
        `)
            $('body').append(form);
            $('body').append(modal);
        }
    });
</script>
