import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

var html = htm.bind(h);

function PoemContent({ item }) {
  return html`
    <div class="poem-title">${item.title}</div>
    <div class="poem-meta">${item.dynasty}·${item.author}</div>
    <div class="poem-body">
      ${item.paragraphs.map(function (line) {
        return html`<p>${line}</p>`;
      })}
    </div>
  `;
}

function IdiomContent({ item }) {
  return html`
    <div class="poem-title">${item.title}</div>
    <div class="story-section">
      <div class="story-label">释义</div>
      <div class="story-text">${item.explanation}</div>
    </div>
    <div class="story-section">
      <div class="story-label">故事</div>
      <div class="story-text">${item.story}</div>
    </div>
  `;
}

function FableContent({ item }) {
  return html`
    <div class="poem-title">${item.title}</div>
    <div class="story-section">
      <div class="story-label">故事</div>
      <div class="story-text">${item.story}</div>
    </div>
    <div class="story-section">
      <div class="story-label">寓意</div>
      <div class="story-text moral">${item.moral}</div>
    </div>
  `;
}

function YijingContent({ item }) {
  return html`
    <div class="hexagram-symbol">${item.symbol}</div>
    <div class="poem-title">${item.title}</div>
    <div class="story-section">
      <div class="story-label">卦辞</div>
      <div class="story-text">${item.judgment}</div>
    </div>
    <div class="story-section">
      <div class="story-label">彖曰</div>
      <div class="story-text">${item.tuan}</div>
    </div>
    <div class="story-section">
      <div class="story-label">大象</div>
      <div class="story-text">${item.image}</div>
    </div>
    <div class="story-section">
      <div class="story-label">爻辞</div>
      <div class="lines-list">
        ${item.lines && item.lines.map(function (line) {
          return html`
            <div class="line-item">
              <div class="line-name">${line.name}</div>
              <div class="line-text">${line.text}</div>
              <div class="line-xiang">象曰：${line.xiang}</div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
}

function LaoziContent({ item }) {
  return html`
    <div class="poem-meta">第${item.chapter}章</div>
    <div class="poem-title">${item.title}</div>
    <div class="poem-body">
      ${item.paragraphs.map(function (line) {
        return html`<p>${line}</p>`;
      })}
    </div>
  `;
}

function ClassicTextContent({ item }) {
  return html`
    <div class="poem-title">${item.title}</div>
    ${item.book && html`<div class="poem-meta">《${item.book}》</div>`}
    <div class="poem-body">
      ${item.paragraphs.map(function (line) {
        return html`<p>${line}</p>`;
      })}
    </div>
  `;
}

export function ContentCard({ item, type, fadeClass }) {
  if (!item) return null;

  var content;
  switch (type) {
    case 'poem':
    case 'ci':
      content = html`<${PoemContent} item=${item} />`;
      break;
    case 'idiom':
      content = html`<${IdiomContent} item=${item} />`;
      break;
    case 'fable':
      content = html`<${FableContent} item=${item} />`;
      break;
    case 'yijing':
      content = html`<${YijingContent} item=${item} />`;
      break;
    case 'laozi':
      content = html`<${LaoziContent} item=${item} />`;
      break;
    case 'zhuangzi':
    case 'lunyu':
      content = html`<${ClassicTextContent} item=${item} />`;
      break;
    default:
      content = html`<${ClassicTextContent} item=${item} />`;
  }

  return html`
    <div class="card ${fadeClass || ''}">
      ${content}
    </div>
  `;
}
