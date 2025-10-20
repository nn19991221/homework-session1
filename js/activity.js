// js/activity.js
$(function () {
  const $table = $('main table');

  // —— Modal 相关节点（Day 2 要求）——
  const $modal = $('#selectedModal');
  const $modalList = $('#modalList');
  const $modalEmpty = $('#modalEmpty');

  // —— 兼容旧版（选中列表盒子，若不存在也不影响）——
  const $box = $('#selected-box');
  const $list = $('#selected-list');

  // 用 Map 保存当前选中项：key => { text, cliff, colIndex }
  const selected = new Map();

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
      .attr({ role: 'button', tabindex: '0', 'aria-pressed': 'false' });
  });

  // —— 工具：根据单元格生成唯一 key（防止重复项）——
  function cellKey($cell) {
    const text = $cell.text().trim();
    const colIndex = $cell.index();  // 列索引
    return `${colIndex}::${text}`;   // 组合成唯一键
  }

  // —— 工具：根据列索引取表头（cliff 名）——
  function cliffNameByCol(colIndex) {
    return $table.find('thead th').eq(colIndex).text().trim();
  }

  // —— 渲染到 Modal & 兼容旧版列表 —— 
  function renderSelection() {
    // 渲染 Modal
    $modalList.empty();
    if (selected.size === 0) {
      $modalEmpty.show();
    } else {
      $modalEmpty.hide();
      // 用列表展示
      // 你也可以换成 <ul class="list-group"> 样式：把 li 加上 class="list-group-item d-flex justify-content-between align-items-center"
      selected.forEach((item, key) => {
        const $li = $(`
          <li data-key="${key}" class="mb-1">
            ${item.text} — <em>${item.cliff}</em>
          </li>
        `);
        $modalList.append($li);
      });
    }

    // 兼容旧版（如果页面还保留了 Selected Box）
    if ($list.length) {
      $list.empty();
      selected.forEach((item, key) => {
        $list.append(`<li data-key="${key}">${item.text} — <em>${item.cliff}</em></li>`);
      });
      if (selected.size === 0) {
        $box.hide();
      } else {
        $box.show();
      }
    }
  }

  // 4) 点击切换 & 同步 Modal
  $table.on('click', 'td.selectable', function () {
    const $cell = $(this);
    const key = cellKey($cell);
    const text = $cell.text().trim();
    const colIndex = $cell.index();
    const cliff = cliffNameByCol(colIndex);

    if ($cell.hasClass('selected')) {
      // 取消选中
      $cell.removeClass('selected').attr('aria-pressed', 'false');
      selected.delete(key);
    } else {
      // 选中
      $cell.addClass('selected').attr('aria-pressed', 'true');
      selected.set(key, { text, cliff, colIndex });
    }

    renderSelection();

    // 有选中项时，展示 Modal（符合 Day 2 要求）
    if (selected.size > 0) {
      $modal.modal('show');
    } else {
      $modal.modal('hide');
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
