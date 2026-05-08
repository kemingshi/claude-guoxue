import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

var html = htm.bind(h);

export function Sidebar({ categories, activeCategory, onSelect }) {
  return html`
    <nav class="sidebar">
      ${categories.map(function (cat) {
        var isActive = cat.key === activeCategory;
        return html`
          <button
            class="sidebar-item ${isActive ? 'sidebar-item-active' : ''}"
            onClick=${function () { onSelect(cat.key); }}
          >
            <span class="sidebar-icon">${cat.icon}</span>
            <span class="sidebar-label">${cat.label}</span>
          </button>
        `;
      })}
    </nav>
  `;
}
