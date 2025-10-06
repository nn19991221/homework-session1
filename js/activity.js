// js/activity.js
$(function () {
  const $table = $('main table');

  // 1) 标记 “Not Available” 的单元格为不可选
  $table.find('tbody td').filter(function () {
    return $(this).text().trim().toLowerCase() === 'not available';
  }).addClass('na')
    .attr({ 'aria-disabled': 'true', 'title': 'Not available', 'tabindex': '-1' });

  // 2) 标记每行第1列（活动名称列）为“行标题”，不可选
  $table.find('tbody tr').each(function () {
    $(this).children('td').eq(0).addClass('row-title').attr({ 'aria-hidden': 'true' });
  });

  // 3) 其余可选的单元格加上 .selectable（将作为可点击目标）
  $table.find('tbody tr').each(function () {
    $(this).children('td:not(.na):not(.row-title)')
      .addClass('selectable')
      .attr({ 'role': 'button', 'tabindex': '0', 'aria-pressed': 'false' });
  });

  // 4) 点击切换选中/取消
  $table.on('click', 'td.selectable', function () {
    const $cell = $(this);
    const isSelected = $cell.hasClass('selected');
    $cell.toggleClass('selected', !isSelected)
         .attr('aria-pressed', String(!isSelected));
  });

  // 5) 键盘支持（Enter / Space）
  $table.on('keydown', 'td.selectable', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).trigger('click');
    }
  });
});
