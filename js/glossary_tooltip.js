(function ($, Drupal) {
  Drupal.behaviors.glossaryTooltip = {
    attach: function (context, settings) {
      $('.glossary-tooltip', context).once('glossaryTooltip').click(function (e) {

        // Get term values.
        var description = $(this).data('description');
        var termUrl = $(this).data('term-url');
        var basePath = drupalSettings.glossaryTooltip ? drupalSettings.glossaryTooltip.basePath : '/';
        var arrowImagePath = basePath + 'modules/custom/glossary_tooltip/svg/arrow-icon.svg';

        // Description limit to 100 characters.
        var truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

        // add "Read more".
        if (description.length > 100) {
          truncatedDescription += '<br><a href="' + termUrl + '" class="read-more-glossary" target="_blank">Read more ' +
            '<img src="' + arrowImagePath + '" alt="arrow" width="13" height="13">' +
            '</a>';
        }

        $('.glossary-popup').remove();

        var $popup = $('<div class="glossary-popup">' + truncatedDescription + '</div>');
        $('body').append($popup);

        $popup.css({
          top: e.pageY + 10,
          left: e.pageX + 10
        }).fadeIn();
        e.preventDefault();
      });

      $(document).click(function (e) {
        if (!$(e.target).closest('.glossary-tooltip, .glossary-popup').length) {
          $('.glossary-popup').fadeOut(function () {
            $(this).remove();
          });
        }
      });
    }
  };
})(jQuery, Drupal);
