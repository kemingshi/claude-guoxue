import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

var html = htm.bind(h);

export function Actions({ onRandom, onShare }) {
  return html`
    <div class="actions">
      <button class="btn" onClick=${onRandom}>
        <span>换一篇</span>
      </button>
      <button class="btn" onClick=${onShare}>
        <span>分享</span>
      </button>
    </div>
  `;
}
