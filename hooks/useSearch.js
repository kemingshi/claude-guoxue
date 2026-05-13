function getSearchableText(item, type) {
  var texts = [item.title || ''];
  switch (type) {
    case 'poem':
    case 'ci':
      if (item.author) texts.push(item.author);
      if (item.paragraphs) texts = texts.concat(item.paragraphs);
      break;
    case 'idiom':
      if (item.explanation) texts.push(item.explanation);
      if (item.story) texts.push(item.story);
      break;
    case 'fable':
      if (item.story) texts.push(item.story);
      if (item.moral) texts.push(item.moral);
      break;
    case 'yijing':
      if (item.judgment) texts.push(item.judgment);
      if (item.tuan) texts.push(item.tuan);
      if (item.image) texts.push(item.image);
      if (item.lines) item.lines.forEach(function (l) {
        texts.push(l.text);
        texts.push(l.xiang);
      });
      break;
    case 'laozi':
    case 'zhuangzi':
    case 'lunyu':
      if (item.paragraphs) texts = texts.concat(item.paragraphs);
      break;
  }
  return texts.join(' ');
}

export function search(items, query, type) {
  if (!query || !query.trim()) return [];
  var q = query.trim().toLowerCase();
  return items.filter(function (item) {
    return getSearchableText(item, type).toLowerCase().indexOf(q) !== -1;
  });
}
