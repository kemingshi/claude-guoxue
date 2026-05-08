import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

var html = htm.bind(h);

export function Toast({ message, visible }) {
  return html`
    <div class="toast ${visible ? 'show' : ''}">${message}</div>
  `;
}
