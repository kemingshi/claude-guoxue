import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

var html = htm.bind(h);

export function SearchBar({ query, onInput, onSearch }) {
  function handleKeydown(e) {
    if (e.key === 'Enter') onSearch();
  }

  return html`
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        placeholder="搜索..."
        value=${query}
        onInput=${function (e) { onInput(e.target.value); }}
        onKeydown=${handleKeydown}
      />
      <button class="btn btn-search" onClick=${onSearch}>搜索</button>
    </div>
  `;
}
