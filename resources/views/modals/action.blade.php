<script>
    $(document).ready(function() {

       $('.modal-button').on('click', function() {
            const id = $(this).data('id');
            const message = $(this).data('message');
            const action = $(this).data('action');
            const pathname = $(this).data('pathname');
            const title = $(this).data('title');

            createModal(id, message, action, pathname, title);

            $(`#${action}-${id}`).modal('show');
        });

        function createForm(action, pathname, id) {
            if(action === "delete" || action === "trash"){
                return $(`
                    <form action="${pathname}" method="POST" id="form-${action}-${id}">
                        @method("DELETE")
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    </form>
                `);
            }else {
                return $(`
                    <form action="${pathname}" method="POST" id="form-${action}-${id}">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    </form>
                `);
            }
        }

        function createModal(id, message, action, pathname, title) {

            const form = createForm(action, pathname, id);

            const modal = $(`
                <div class="modal fade" id="${action}-${id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${action}-${id}-label" aria-hidden="true">
                   <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                               <div class="modal-header">
                                 <h5 class="modal-title" id="${action}-${id}-label">${title.charAt(0).toUpperCase() + title.slice(1)}</h5>
                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                             </div>
                             <div class="modal-body">
                                ${message}?
                            </div>
                            <div class="modal-footer">
                                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                 <button type="submit" form="form-${action}-${id}" class="btn btn-primary">${action.charAt(0).toUpperCase() + action.slice(1)}</button>
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
