(function (Drupal) {
  Drupal.behaviors.my_component = {
    attach: function attach(context) {
      console.log('Replace me with the real JS behavior');



    document.addEventListener('alpine:init', () => {
      Alpine.data('dropdown', () => ({
        open: false,

        toggle() {
          this.open = !this.open
        }
      }))
    })


    },
  };
})(Drupal);