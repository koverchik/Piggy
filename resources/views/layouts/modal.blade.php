<script>
    $(document).ready(function() {
        const { pathname, origin } = new URL(window.location);

        const textMessage = (type, name)=> {
            switch (type) {
                case "restore":
                    return `Are you sure you want restore "${name}" ${type}?`;
                case "trash":
                    return `Are you sure you want  move to trash "${name}" ${type}?`;
                case "delete":
                    return `Are you sure you want to delete "${name}" ${type}?`;
                default:
                    return `Error`;
            }
        };


       $('.delete-button').on('click', function() {
            const id = $(this).data('id');
            const name = $(this).data('name');
            const type = $(this).data('type');
            const action = $(this).data('action');

            createModal(id, name, type, action);

            $(`#${type}-${id}`).modal('show');
        });

        function getActionPath(pathname, type) {
            if (pathname.includes('wallet')) {
                return `${origin}/wallet-${type}`;
            } else if (pathname.includes('budget')) {
                return `${origin}/budget-${type}`;
            }
        }

        function createModal(id, name, type) {
            const action = getActionPath(pathname, type)

            const form = $(`
            <form action="${action}" method="POST" id="form-${type}-${id}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="id" class="form-control" id="input-${id}" value="${id}">
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
                            ${textMessage(type,name)}
                        </div>
                        <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                             <button type="submit" form="form-${type}-${id}" class="btn btn-primary">${type.charAt(0).toUpperCase() + type.slice(1)}</button>
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
