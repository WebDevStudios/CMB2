window.wysiwyg = (function($) {
  'use strict';

  // Private variables

  // Public variables
  var my = {
  };

  /**
   * Initializes editors for a new CMB row.
   *
   * @param jQuery
   */
  my.init = function($group) {
    $group.find('.wp-editor-wrap').each(function(i, el) {
      var $el = $(el),
        $textarea = $el.find('textarea'),
        id = $textarea.attr('id');

      $el.html('' +
        '<div class="wp-editor-tools hide-if-no-js">' +
        '	 <div class="wp-media-buttons">' +
        '			<a href="#" class="button insert-media add_media" data-editor="' + id + '" title="Add Media"><span class="wp-media-buttons-icon"></span> Add Media</a>' +
        '  </div>' +
        '   <div class="wp-editor-tabs">' +
        '     <button id="' + id + '-tmce" type="button" class="wp-switch-editor switch-tmce" data-wp-editor-id="' + id + '">Visual</button>' +
        '     <button id="' + id + '-html" type="button" class="wp-switch-editor switch-html" data-wp-editor-id="' + id + '">Text</button>' +
        '   </div>' +
        ' </div>' +
        ' <div class="wp-editor-container">' +
        '    <textarea class="block-content-editor" id="' + id + '" name="' + $textarea.attr('name') + '"></textarea>' +
        ' </div>');

      // Use the same settings as the post body.
      var settings = $.extend({}, tinyMCEPreInit.mceInit['content']);
      settings.selector = '#' + idSelector;
      tinyMCEPreInit.mceInit[idSelector] = settings;
      var qtSettings = $.extend({}, tinyMCEPreInit.qtInit['content']);
      qtSettings.id = idSelector;
      tinyMCEPreInit.qtInit[idSelector] = qtSettings;

      tinyMCE.init(tinyMCEPreInit.mceInit[idSelector]);
      window.quicktags(qtSettings);

      // This needs to be called here due to the late initialization.  If it isn't, the buttons won't appear.
      window.QTags._buttonsInit();
    });
  };

  /**
   * Destroys one editor.
   *
   * @param string idSelector
   */
  my.destroy = function(idSelector) {
    var editor = tinyMCE.get(idSelector);
    editor.destroy();
  };

  /**
   * Destroys all editors in a group
   *
   * @param jQuery $group
   */
  my.destroyAll = function($group) {
    $group.find('.wp-editor-wrap textarea').each(function(i, el) {
      my.destroy($(el).attr('id'));
    });
  };

  /**
   * Reinitializes existing editors in this group
   *
   * @param jQuery $group
   */
  my.reinitAll = function($group) {
    $group.find('.wp-editor-wrap textarea').each(function(i, el) {
      var innerId = $(el).attr('id');
      tinyMCE.init(tinyMCEPreInit.mceInit[innerId]);

      // Also, switch back to visual to start if on text, because making the editor makes it go to visual mode.
      $('#' + innerId).parents('.wp-editor-wrap').removeClass('html-active').addClass('tmce-active');
    });
  };

  return my;
})(jQuery);