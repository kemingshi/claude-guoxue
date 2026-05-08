import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
import { useState, useEffect, useRef } from 'https://esm.sh/preact/hooks';

import { categories } from '../config/categories.js';
import { getRandomIndex } from '../hooks/useRandom.js';
import { search } from '../hooks/useSearch.js';
import { Sidebar } from './Sidebar.js';
import { SearchBar } from './SearchBar.js';
import { ContentCard } from './ContentCard.js';
import { Actions } from './Actions.js';
import { Toast } from './Toast.js';

var html = htm.bind(h);

function App() {
  var firstCategory = categories[0];

  var _useState = useState(firstCategory.key),
    activeCategory = _useState[0],
    setActiveCategory = _useState[1];

  var _useState2 = useState({}),
    currentIndexes = _useState2[0],
    setCurrentIndexes = _useState2[1];

  var _useState3 = useState('random'),
    viewMode = _useState3[0],
    setViewMode = _useState3[1];

  var _useState4 = useState(''),
    searchQuery = _useState4[0],
    setSearchQuery = _useState4[1];

  var _useState5 = useState([]),
    searchResults = _useState5[0],
    setSearchResults = _useState5[1];

  var _useState6 = useState(null),
    viewingItem = _useState6[0],
    setViewingItem = _useState6[1];

  var _useState7 = useState({}),
    toastState = _useState7[0],
    setToastState = _useState7[1];

  var _useState8 = useState(''),
    fadeClass = _useState8[0],
    setFadeClass = _useState8[1];

  var toastTimer = useRef(null);

  function getCat(key) {
    return categories.find(function (c) { return c.key === key; });
  }

  function getCurrentData() {
    var cat = getCat(activeCategory);
    return cat ? cat.data : [];
  }

  function getCurrentItem() {
    var data = getCurrentData();
    var idx = currentIndexes[activeCategory];
    if (idx === undefined || idx >= data.length) {
      idx = getRandomIndex(-1, data.length);
      setCurrentIndexes(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[activeCategory] = idx;
        return next;
      });
    }
    return data[idx] || null;
  }

  function handleCategoryChange(key) {
    setFadeClass('fade-out');
    setTimeout(function () {
      setActiveCategory(key);
      setViewMode('random');
      setSearchQuery('');
      setSearchResults([]);
      setViewingItem(null);
      setFadeClass('');
    }, 300);
  }

  function handleRandom() {
    var data = getCurrentData();
    if (data.length === 0) return;
    setFadeClass('fade-out');
    setTimeout(function () {
      var currentIdx = currentIndexes[activeCategory] || 0;
      var newIdx = getRandomIndex(currentIdx, data.length);
      setCurrentIndexes(function (prev) {
        var next = {};
        for (var k in prev) next[k] = prev[k];
        next[activeCategory] = newIdx;
        return next;
      });
      setViewingItem(null);
      setFadeClass('');
    }, 300);
  }

  function handleShare() {
    var item = viewingItem || getCurrentItem();
    if (!item) return;
    var text = formatShareText(item, activeCategory);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('已复制到剪贴板');
      }, function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function formatShareText(item, type) {
    switch (type) {
      case 'poem':
      case 'ci':
        return item.title + '\n' + item.dynasty + '·' + item.author + '\n\n' + item.paragraphs.join('\n');
      case 'idiom':
        return item.title + '\n\n释义：' + item.explanation + '\n\n' + item.story;
      case 'fable':
        return item.title + '\n\n' + item.story + '\n\n寓意：' + item.moral;
      case 'yijing':
        return item.title + ' ' + item.symbol + '\n\n卦辞：' + item.judgment + '\n\n象曰：' + item.image;
      case 'laozi':
        return '老子·第' + item.chapter + '章 ' + item.title + '\n\n' + item.paragraphs.join('\n');
      case 'zhuangzi':
        return '庄子·' + item.title + '\n\n' + item.paragraphs.join('\n');
      case 'lunyu':
        return '论语·' + item.book + '\n' + item.title + '\n\n' + item.paragraphs.join('\n');
      default:
        return item.title;
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('已复制到剪贴板');
    } catch (e) {
      showToast('复制失败');
    }
    document.body.removeChild(textarea);
  }

  function showToast(message) {
    setToastState({ message: message, visible: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(function () {
      setToastState(function (prev) { return { message: prev.message, visible: false }; });
    }, 2000);
  }

  function handleSearch() {
    if (!searchQuery.trim()) {
      setViewMode('random');
      setSearchResults([]);
      return;
    }
    var data = getCurrentData();
    var results = search(data, searchQuery, activeCategory);
    setSearchResults(results);
    setViewMode('search');
    setViewingItem(null);
  }

  function handleSearchInput(value) {
    setSearchQuery(value);
    if (!value.trim()) {
      setViewMode('random');
      setSearchResults([]);
    }
  }

  function handleResultClick(item) {
    setViewingItem(item);
  }

  var currentItem = getCurrentItem();
  var cat = getCat(activeCategory);
  var totalCount = cat ? cat.data.length : 0;

  return html`
    <div class="app-layout">
      <${Sidebar}
        categories=${categories}
        activeCategory=${activeCategory}
        onSelect=${handleCategoryChange}
      />
      <main class="main-content">
        <div class="header">国学经典</div>
        <div class="container">
          <${SearchBar}
            query=${searchQuery}
            onInput=${handleSearchInput}
            onSearch=${handleSearch}
          />
          ${viewMode === 'random' && currentItem && html`
            <${Actions}
              onRandom=${handleRandom}
              onShare=${handleShare}
            />
            <${ContentCard}
              item=${currentItem}
              type=${activeCategory}
              fadeClass=${fadeClass}
            />
            <div class="stats">共 ${totalCount} 条</div>
          `}
          ${viewMode === 'search' && html`
            <div class="search-header">
              搜索结果：${searchResults.length} 条
            </div>
            ${viewingItem && html`
              <${Actions}
                onRandom=${function () { setViewingItem(null); }}
                onShare=${handleShare}
              />
              <${ContentCard}
                item=${viewingItem}
                type=${activeCategory}
              />
            `}
            ${!viewingItem && html`
              <div class="search-results">
                ${searchResults.map(function (item) {
                  return html`
                    <div class="search-result-item" onClick=${function () { handleResultClick(item); }}>
                      <span class="search-result-title">· ${item.title}</span>
                      ${item.author && html`<span class="search-result-meta"> — ${item.author}</span>`}
                      ${item.book && html`<span class="search-result-meta"> — ${item.book}</span>`}
                    </div>
                  `;
                })}
                ${searchResults.length === 0 && html`
                  <div class="search-empty">未找到匹配的内容</div>
                `}
              </div>
            `}
          `}
        </div>
      </main>
      <${Toast} message=${toastState.message} visible=${toastState.visible} />
    </div>
  `;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(function () {});
}

render(html`<${App} />`, document.getElementById('app'));
