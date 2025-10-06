// js/activity.js
$(function () {
  const $table = $('main table');
  const $box = $('#selected-box');
  const $list = $('#selected-list');

  // 1) 标记 “Not Available” 为不可选
  $table.find('tbody td').filter(function () {
    return $(this).text().trim().toLowerCase() === 'not available';
  }).addClass('na')
    .attr({ 'aria-disabled': 'true', 'title': 'Not available', 'tabindex': '-1' });

  // 2) 首列（活动名称）不可选
  $table.find('tbody tr').each(function () {
    $(this).children('td').eq(0).addClass('row-title').attr({ 'aria-hidden': 'true' });
  });

  // 3) 其余可选
  $table.find('tbody tr').each(function () {
    $(this).children('td:not(.na):not(.row-title)')
      .addClass('selectable')
      .attr({ 'role': 'button', 'tabindex': '0', 'aria-pressed': 'false' });
  });

  // —— 工具：根据单元格生成唯一 key（防止重复项）——
  function cellKey($cell) {
    const text = $cell.text().trim();
    const colIndex = $cell.index();                 // 列索引
    return `${colIndex}::${text}`;                  // 组合成唯一键
  }

  // —— 工具：根据列索引取表头（cliff 名）——
  function cliffNameByCol(colIndex) {
    return $table.find('thead th').eq(colIndex).text().trim();
  }

  // 4) 点击切换 & 同步侧边列表
  $table.on('click', 'td.selectable', function () {
    const $cell = $(this);
    const isSelected = $cell.hasClass('selected');
    const text = $cell.text().trim();
    const colIndex = $cell.index();
    const cliff = cliffNameByCol(colIndex);
    const key = cellKey($cell);

    if (isSelected) {
      // 取消选中：移除样式与列表项
      $cell.removeClass('selected').attr('aria-pressed', 'false');
      $list.find(`li[data-key="${key}"]`).remove();
    } else {
      // 选中：加样式并添加到列表（带 cliff 名）
      $cell.addClass('selected').attr('aria-pressed', 'true');
      // 避免重复添加
      if ($list.find(`li[data-key="${key}"]`).length === 0) {
        $list.append(`<li data-key="${key}">${text} — <em>${cliff}</em></li>`);
      }
    }

    // 控制显示/隐藏
    if ($list.children().length === 0) {
      $box.hide();
    } else {
      $box.show();
    }
  });

  // 5) 键盘支持（Enter / Space）
  $table.on('keydown', 'td.selectable', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).trigger('click');
    }
  });
});
